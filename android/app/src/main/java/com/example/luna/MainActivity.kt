package com.example.luna

import android.annotation.SuppressLint
import android.app.Activity
import android.app.AlertDialog
import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.JsResult
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
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

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { _ -> }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        if (androidx.core.content.ContextCompat.checkSelfPermission(
                this,
                android.Manifest.permission.CAMERA
            ) != android.content.pm.PackageManager.PERMISSION_GRANTED
        ) {
            requestPermissionLauncher.launch(android.Manifest.permission.CAMERA)
        }
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

                                webViewClient = object : WebViewClient() {
                                    override fun shouldOverrideUrlLoading(
                                        view: WebView?,
                                        request: android.webkit.WebResourceRequest?
                                    ): Boolean {
                                        val url = request?.url?.toString()
                                        if (url != null && !url.startsWith("file:///")) {
                                            try {
                                                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                                                context.startActivity(intent)
                                                return true
                                            } catch (e: Exception) {
                                                e.printStackTrace()
                                            }
                                        }
                                        return false
                                    }

                                    @Deprecated("Deprecated in Java")
                                    override fun shouldOverrideUrlLoading(
                                        view: WebView?,
                                        url: String?
                                    ): Boolean {
                                        if (url != null && !url.startsWith("file:///")) {
                                            try {
                                                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                                                context.startActivity(intent)
                                                return true
                                            } catch (e: Exception) {
                                                e.printStackTrace()
                                            }
                                        }
                                        return false
                                    }
                                }
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
                                    override fun onPermissionRequest(request: android.webkit.PermissionRequest?) {
                                        runOnUiThread {
                                            request?.grant(request.resources)
                                        }
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

        @JavascriptInterface
        fun openInBrowser(url: String) {
            try {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                activity.startActivity(intent)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        @JavascriptInterface
        fun downloadApk(url: String) {
            try {
                val request = DownloadManager.Request(Uri.parse(url))
                request.setTitle("Ciserli App Actualizacion")
                request.setDescription("Descargando actualizacion...")
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                
                // Save to downloads directory with unique name
                val fileName = "ciserli-update-${System.currentTimeMillis()}.apk"
                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName)
                
                val manager = activity.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
                manager.enqueue(request)
                
                activity.runOnUiThread {
                    Toast.makeText(activity, "Iniciando descarga en segundo plano...", Toast.LENGTH_LONG).show()
                }
            } catch (e: Exception) {
                e.printStackTrace()
                // Fallback to opening in browser
                openInBrowser(url)
            }
        }

        @JavascriptInterface
        fun checkOverlayPermission(): Boolean {
            return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                android.provider.Settings.canDrawOverlays(activity)
            } else {
                true
            }
        }

        @JavascriptInterface
        fun requestOverlayPermission() {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                val intent = Intent(
                    android.provider.Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + activity.packageName)
                )
                activity.startActivity(intent)
            }
        }

        @JavascriptInterface
        fun toggleOverlayCat(enabled: Boolean, skin: String, size: String) {
            val intent = Intent(activity, FloatingCatService::class.java).apply {
                putExtra("skin", skin)
                putExtra("size", size)
            }
            if (enabled) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    activity.startForegroundService(intent)
                } else {
                    activity.startService(intent)
                }
            } else {
                activity.stopService(intent)
            }
        }

        @JavascriptInterface
        fun saveQuotes(quotesJson: String) {
            val prefs = activity.getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)
            prefs.edit().putString("quotes", quotesJson).apply()
        }

        @JavascriptInterface
        fun checkUsageStatsPermission(): Boolean {
            val appOps = activity.getSystemService(Context.APP_OPS_SERVICE) as android.app.AppOpsManager
            val mode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                appOps.unsafeCheckOpNoThrow(
                    android.app.AppOpsManager.OPSTR_GET_USAGE_STATS,
                    android.os.Process.myUid(),
                    activity.packageName
                )
            } else {
                @Suppress("DEPRECATION")
                appOps.checkOpNoThrow(
                    android.app.AppOpsManager.OPSTR_GET_USAGE_STATS,
                    android.os.Process.myUid(),
                    activity.packageName
                )
            }
            return mode == android.app.AppOpsManager.MODE_ALLOWED
        }

        @JavascriptInterface
        fun requestUsageStatsPermission() {
            try {
                val intent = Intent(android.provider.Settings.ACTION_USAGE_ACCESS_SETTINGS).apply {
                    data = Uri.parse("package:" + activity.packageName)
                }
                activity.startActivity(intent)
            } catch (e: Exception) {
                try {
                    val intent = Intent(android.provider.Settings.ACTION_USAGE_ACCESS_SETTINGS)
                    activity.startActivity(intent)
                } catch (ex: Exception) {
                    ex.printStackTrace()
                }
            }
        }

        @JavascriptInterface
        fun saveSetting(key: String, value: Boolean) {
            val prefs = activity.getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)
            prefs.edit().putBoolean(key, value).apply()
        }
    }
}
