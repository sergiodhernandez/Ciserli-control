package com.example.luna

import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.JsResult
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import com.example.luna.theme.LunaTheme

class MainActivity : ComponentActivity() {

    private var filePathCallback: ValueCallback<Array<Uri>>? = null

    private val fileChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val data: Intent? = result.data
            val uris = if (data != null) {
                val clipData = data.clipData
                if (clipData != null) {
                    val list = ArrayList<Uri>()
                    for (i in 0 until clipData.itemCount) {
                        list.add(clipData.getItemAt(i).uri)
                    }
                    list.toTypedArray()
                } else {
                    data.data?.let { arrayOf(it) } ?: emptyArray()
                }
            } else {
                emptyArray()
            }
            filePathCallback?.onReceiveValue(uris)
        } else {
            filePathCallback?.onReceiveValue(null)
        }
        filePathCallback = null
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LunaTheme {
                androidx.compose.material3.Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = androidx.compose.material3.MaterialTheme.colorScheme.background
                ) {
                    androidx.compose.ui.viewinterop.AndroidView(
                        modifier = Modifier.fillMaxSize(),
                        factory = { context ->
                            WebView(context).apply {
                                // Enforce full screen layout parameters to prevent height collapse
                                layoutParams = ViewGroup.LayoutParams(
                                    ViewGroup.LayoutParams.MATCH_PARENT,
                                    ViewGroup.LayoutParams.MATCH_PARENT
                                )
                                
                                settings.javaScriptEnabled = true
                                settings.domStorageEnabled = true
                                settings.allowFileAccess = true
                                settings.allowContentAccess = true
                                settings.allowFileAccessFromFileURLs = true
                                settings.allowUniversalAccessFromFileURLs = true
                                settings.cacheMode = WebSettings.LOAD_NO_CACHE
                                clearCache(true)

                                // Register Javascript Interface
                                addJavascriptInterface(WebAppInterface(this@MainActivity), "AndroidApp")

                                webViewClient = WebViewClient()
                                webChromeClient = object : WebChromeClient() {
                                    override fun onJsAlert(
                                        view: WebView?,
                                        url: String?,
                                        message: String?,
                                        result: JsResult?
                                    ): Boolean {
                                        AlertDialog.Builder(this@MainActivity)
                                            .setTitle("Ciserli-app")
                                            .setMessage(message)
                                            .setPositiveButton(android.R.string.ok) { _, _ -> result?.confirm() }
                                            .setCancelable(false)
                                            .show()
                                        return true
                                    }

                                    override fun onJsConfirm(
                                        view: WebView?,
                                        url: String?,
                                        message: String?,
                                        result: JsResult?
                                    ): Boolean {
                                        AlertDialog.Builder(this@MainActivity)
                                            .setTitle("Ciserli-app")
                                            .setMessage(message)
                                            .setPositiveButton(android.R.string.ok) { _, _ -> result?.confirm() }
                                            .setNegativeButton(android.R.string.cancel) { _, _ -> result?.cancel() }
                                            .setCancelable(false)
                                            .show()
                                        return true
                                    }

                                    override fun onShowFileChooser(
                                        webView: WebView?,
                                        filePathCallback: ValueCallback<Array<Uri>>?,
                                        fileChooserParams: FileChooserParams?
                                    ): Boolean {
                                        this@MainActivity.filePathCallback?.onReceiveValue(null)
                                        this@MainActivity.filePathCallback = filePathCallback
                                        
                                        val intent = fileChooserParams?.createIntent()
                                        try {
                                            if (intent != null) {
                                                fileChooserLauncher.launch(intent)
                                            }
                                        } catch (e: Exception) {
                                            this@MainActivity.filePathCallback = null
                                            return false
                                        }
                                        return true
                                    }
                                }
                                loadUrl("file:///android_asset/index.html")
                            }
                        }
                    )
                }
            }
        }
    }

    // JS interface class to share version info with web app
    class WebAppInterface(private val activity: Activity) {
        @JavascriptInterface
        fun getAppVersionCode(): Int {
            return try {
                val pInfo = activity.packageManager.getPackageInfo(activity.packageName, 0)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                    pInfo.longVersionCode.toInt()
                } else {
                    @Suppress("DEPRECATION")
                    pInfo.versionCode
                }
            } catch (e: Exception) {
                1
            }
        }

        @JavascriptInterface
        fun getAppVersionName(): String {
            return try {
                val pInfo = activity.packageManager.getPackageInfo(activity.packageName, 0)
                pInfo.versionName ?: "1.0.0"
            } catch (e: Exception) {
                "1.0.0"
            }
        }
    }
}
