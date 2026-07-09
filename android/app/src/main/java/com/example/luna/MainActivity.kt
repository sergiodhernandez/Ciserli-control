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
import androidx.work.*
import java.util.concurrent.TimeUnit
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import com.example.luna.theme.LunaTheme
import android.app.ActivityManager
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.util.Base64
import java.io.ByteArrayOutputStream
import java.io.File
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : ComponentActivity() {

    private var webView: WebView? = null
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

                                this@MainActivity.webView = this
                                // Register Javascript Interface
                                addJavascriptInterface(WebAppInterface(this@MainActivity, this), "AndroidApp")

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
                                            .setTitle("Ciserli")
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
                                            .setTitle("Ciserli")
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

    fun checkUsageStatsPermissionFromActivity(): Boolean {
        val appOps = getSystemService(Context.APP_OPS_SERVICE) as android.app.AppOpsManager
        val mode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            appOps.unsafeCheckOpNoThrow(
                android.app.AppOpsManager.OPSTR_GET_USAGE_STATS,
                android.os.Process.myUid(),
                packageName
            )
        } else {
            @Suppress("DEPRECATION")
            appOps.checkOpNoThrow(
                android.app.AppOpsManager.OPSTR_GET_USAGE_STATS,
                android.os.Process.myUid(),
                packageName
            )
        }
        return mode == android.app.AppOpsManager.MODE_ALLOWED
    }

    override fun onResume() {
        super.onResume()
        webView?.let { view ->
            val hasPermission = checkUsageStatsPermissionFromActivity()
            view.evaluateJavascript("javascript:if(window.onPermissionChanged) window.onPermissionChanged($hasPermission);", null)
        }
    }

    // JS interface class to share version info with web app
    class WebAppInterface(private val activity: Activity, private val webView: WebView) {
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
            openInBrowser(url)
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
        fun toggleOverlayCat(enabled: Boolean, skin: String, size: String, hat: Boolean, bow: Boolean, glasses: Boolean) {
            val intent = Intent(activity, FloatingCatService::class.java).apply {
                putExtra("skin", skin)
                putExtra("size", size)
                putExtra("hat", hat)
                putExtra("bow", bow)
                putExtra("glasses", glasses)
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
        fun triggerOverlayAction(action: String) {
            val intent = Intent(activity, FloatingCatService::class.java).apply {
                putExtra("action", action)
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                activity.startForegroundService(intent)
            } else {
                activity.startService(intent)
            }
        }

        @JavascriptInterface
        fun saveQuotes(quotesJson: String) {
            val prefs = activity.getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)
            prefs.edit().putString("quotes", quotesJson).apply()
        }

        @JavascriptInterface
        fun checkUsageStatsPermission(): Boolean {
            return (activity as MainActivity).checkUsageStatsPermissionFromActivity()
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

        @JavascriptInterface
        fun getStorageInfo(): String {
            val response = JSONObject()
            try {
                val path = Environment.getDataDirectory()
                val stat = android.os.StatFs(path.path)
                val blockSize = stat.blockSizeLong
                val totalBlocks = stat.blockCountLong
                val availableBlocks = stat.availableBlocksLong
                
                val totalBytes = totalBlocks * blockSize
                val availableBytes = availableBlocks * blockSize
                val usedBytes = totalBytes - availableBytes
                
                response.put("success", true)
                response.put("totalBytes", totalBytes)
                response.put("usedBytes", usedBytes)
                response.put("freeBytes", availableBytes)
            } catch (e: Exception) {
                response.put("success", false)
                response.put("error", e.message)
            }
            return response.toString()
        }

        @JavascriptInterface
        fun startAppScan() {
            Thread {
                try {
                    val pm = activity.packageManager
                    val installedApps = pm.getInstalledApplications(PackageManager.GET_META_DATA)
                    val appListJson = JSONArray()
                    
                    var storageStatsManager: android.app.usage.StorageStatsManager? = null
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        storageStatsManager = activity.getSystemService(Context.STORAGE_STATS_SERVICE) as? android.app.usage.StorageStatsManager
                    }
                    
                    for (appInfo in installedApps) {
                        val isSystem = (appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0
                        if (isSystem && appInfo.packageName != "com.google.android.youtube" && appInfo.packageName != "com.android.chrome") {
                            val launchIntent = pm.getLaunchIntentForPackage(appInfo.packageName)
                            if (launchIntent == null) {
                                continue
                            }
                        }
                        
                        val appName = appInfo.loadLabel(pm).toString()
                        val packageName = appInfo.packageName
                        
                        var cacheSize: Long = 0
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && storageStatsManager != null) {
                            try {
                                val storageStats = storageStatsManager.queryStatsForPackage(
                                    android.os.storage.StorageManager.UUID_DEFAULT,
                                    packageName,
                                    android.os.Process.myUserHandle()
                                )
                                cacheSize = storageStats.cacheBytes
                            } catch (e: Exception) {
                                // Stats might not be queryable (e.g. system app permissions or app disabled)
                            }
                        }
                        
                        if (cacheSize <= 0) {
                            continue
                        }
                        
                        val appJson = JSONObject()
                        appJson.put("name", appName)
                        appJson.put("packageName", packageName)
                        appJson.put("cacheSize", cacheSize)
                        appJson.put("isSystem", isSystem)
                        
                        val iconBase64 = getAppIconBase64(packageName)
                        appJson.put("icon", iconBase64)
                        
                        appListJson.put(appJson)
                    }
                    
                    val resultString = appListJson.toString()
                    val escapedResult = resultString.replace("'", "\\'")
                    
                    activity.runOnUiThread {
                        webView.evaluateJavascript("javascript:if(window.onScanComplete) window.onScanComplete('$escapedResult');", null)
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                    val errorMsg = e.message ?: "Unknown scan error"
                    activity.runOnUiThread {
                        webView.evaluateJavascript("javascript:if(window.onScanError) window.onScanError('$errorMsg');", null)
                    }
                }
            }.start()
        }

        private fun getAppIconBase64(packageName: String): String {
            return try {
                val pm = activity.packageManager
                val icon = pm.getApplicationIcon(packageName)
                val bitmap = if (icon is BitmapDrawable) {
                    icon.bitmap
                } else {
                    val width = icon.intrinsicWidth.coerceAtLeast(1)
                    val height = icon.intrinsicHeight.coerceAtLeast(1)
                    val bmp = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
                    val canvas = Canvas(bmp)
                    icon.setBounds(0, 0, canvas.width, canvas.height)
                    icon.draw(canvas)
                    bmp
                }
                val scaledBitmap = Bitmap.createScaledBitmap(bitmap, 64, 64, true)
                val outputStream = ByteArrayOutputStream()
                scaledBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
                Base64.encodeToString(outputStream.toByteArray(), Base64.NO_WRAP)
            } catch (e: Exception) {
                ""
            }
        }

        @JavascriptInterface
        fun onPermissionChanged(hasPermission: Boolean) {
            activity.runOnUiThread {
                webView.evaluateJavascript("javascript:if(window.onPermissionChanged) window.onPermissionChanged($hasPermission);", null)
            }
        }

        @JavascriptInterface
        fun scheduleOptimization(hour: Int) {
            // Save hour in SharedPreferences
            val prefs = activity.getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)
            prefs.edit().putInt("optimize_hour", hour).apply()
            // Schedule periodic work with WorkManager (once daily at specified hour)
            val current = java.util.Calendar.getInstance()
            val target = java.util.Calendar.getInstance().apply { set(java.util.Calendar.HOUR_OF_DAY, hour); set(java.util.Calendar.MINUTE, 0); set(java.util.Calendar.SECOND, 0) }
            if (target.before(current)) { target.add(java.util.Calendar.DAY_OF_MONTH, 1) }
            val delay = target.timeInMillis - current.timeInMillis
            val work = PeriodicWorkRequestBuilder<OptimizationWorker>(24, TimeUnit.HOURS)
                .setInitialDelay(delay, TimeUnit.MILLISECONDS)
                .build()
            WorkManager.getInstance(activity).enqueueUniquePeriodicWork("optimizeWork", ExistingPeriodicWorkPolicy.REPLACE, work)
        }

        @JavascriptInterface
        fun getHistory(): String {
            val prefs = activity.getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)
            return prefs.getString("opt_history", "[]") ?: "[]"
        }

        @JavascriptInterface
        fun addHistoryEntry(entryJson: String) {
            val prefs = activity.getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)
            val existing = prefs.getString("opt_history", "[]") ?: "[]"
            val arr = JSONArray(existing)
            arr.put(JSONObject(entryJson))
            prefs.edit().putString("opt_history", arr.toString()).apply()
        }

        @JavascriptInterface
        fun optimizeApps(packagesJson: String, actionType: String): String {
            val response = JSONObject()
            try {
                val am = activity.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
                val packagesArray = JSONArray(packagesJson)
                val rawPackages = mutableListOf<String>()
                for (i in 0 until packagesArray.length()) {
                    rawPackages.add(packagesArray.getString(i))
                }

                var storageStatsManager: android.app.usage.StorageStatsManager? = null
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    storageStatsManager = activity.getSystemService(Context.STORAGE_STATS_SERVICE) as? android.app.usage.StorageStatsManager
                }

                // Get running packages
                val runningProcesses = am.runningAppProcesses
                val runningPackages = mutableSetOf<String>()
                if (runningProcesses != null) {
                    for (procInfo in runningProcesses) {
                        for (pkg in procInfo.pkgList) {
                            runningPackages.add(pkg)
                        }
                    }
                }

                // Filter packages according to actionType
                val packagesToKill = rawPackages.filter { pkg ->
                    if (actionType == "force_stop") {
                        pkg in runningPackages
                    } else if (actionType == "clear_cache") {
                        var cacheSize: Long = 0
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && storageStatsManager != null) {
                            try {
                                val storageStats = storageStatsManager.queryStatsForPackage(
                                    android.os.storage.StorageManager.UUID_DEFAULT,
                                    pkg,
                                    android.os.Process.myUserHandle()
                                )
                                cacheSize = storageStats.cacheBytes
                            } catch (e: Exception) {
                                // Ignore
                            }
                        }
                        cacheSize > 0
                    } else {
                        true
                    }
                }

                // If accessibility service is enabled, run the automated accessibility cleaning!
                if (isAccessibilityServiceEnabled()) {
                    activity.runOnUiThread {
                        AutoCleanService.startCleaning(activity, packagesToKill, actionType) { index, total ->
                            webView.evaluateJavascript("javascript:if(window.onCleanProgress) window.onCleanProgress($index, $total, '$actionType');", null)
                        }
                    }
                    response.put("success", true)
                    response.put("async", true)
                    response.put("ramFreed", 0L)
                    response.put("ownCacheFreed", 0L)
                    response.put("systemCleaned", 0L)
                    return response.toString()
                }
                
                var ramFreed: Long = 0
                var ownCacheFreed: Long = 0
                var systemCleaned: Long = 0

                // 1. Terminar procesos en segundo plano (Solo si se requiere forzar detención o todo)
                if (actionType == "force_stop" || actionType == "all") {
                    val runningProcesses = am.runningAppProcesses
                    if (runningProcesses != null) {
                        for (procInfo in runningProcesses) {
                            val intersect = procInfo.pkgList.filter { it in packagesToKill }
                            if (intersect.isNotEmpty()) {
                                val pid = procInfo.pid
                                try {
                                    val memInfo = am.getProcessMemoryInfo(intArrayOf(pid))
                                    if (memInfo.isNotEmpty()) {
                                        ramFreed += memInfo[0].totalPss * 1024L // convert PSS KB to bytes
                                    }
                                } catch (e: Exception) {
                                    ramFreed += 15 * 1024 * 1024L // fallback 15MB
                                }
                            }
                        }
                    }
                    
                    for (pkg in packagesToKill) {
                        try {
                            am.killBackgroundProcesses(pkg)
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }
                    }
                }
                
                // 2. Limpiar la caché propia de la aplicación y truco de asignación (Solo si se requiere borrar caché o todo)
                if (actionType == "clear_cache" || actionType == "all") {
                    try {
                        ownCacheFreed = deleteDirContent(activity.cacheDir)
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                    
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        try {
                            val storageManager = activity.getSystemService(Context.STORAGE_SERVICE) as android.os.storage.StorageManager
                            val uuid = android.os.storage.StorageManager.UUID_DEFAULT
                            val allocatableBytes = storageManager.getAllocatableBytes(uuid)
                            if (allocatableBytes > 10 * 1024 * 1024L) { // más de 10MB
                                val bytesToRequest = (allocatableBytes * 0.90).toLong() // solicitar 90%
                                storageManager.allocateBytes(uuid, bytesToRequest)
                                systemCleaned = bytesToRequest
                            }
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }
                    }
                }
                
                response.put("success", true)
                response.put("ramFreed", ramFreed)
                response.put("ownCacheFreed", ownCacheFreed)
                response.put("systemCleaned", systemCleaned)
            } catch (e: Exception) {
                e.printStackTrace()
                try {
                    response.put("success", false)
                    response.put("error", e.message)
                } catch (jsonEx: Exception) {}
            }
            return response.toString()
        }

        private fun deleteDirContent(dir: File?): Long {
            var bytes: Long = 0
            if (dir != null && dir.isDirectory) {
                val children = dir.listFiles()
                if (children != null) {
                    for (child in children) {
                        bytes += getFolderSize(child)
                        child.deleteRecursively()
                    }
                }
            }
            return bytes
        }

        private fun getFolderSize(file: File): Long {
            var size: Long = 0
            if (file.isDirectory) {
                val files = file.listFiles()
                if (files != null) {
                    for (f in files) {
                        size += getFolderSize(f)
                    }
                }
            } else {
                size += file.length()
            }
            return size
        }

        @JavascriptInterface
        fun openAppSettings(packageName: String) {
            try {
                val intent = Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
                    data = Uri.parse("package:$packageName")
                }
                activity.startActivity(intent)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        @JavascriptInterface
        fun isAccessibilityServiceEnabled(): Boolean {
            val expectedComponentName = android.content.ComponentName(activity, AutoCleanService::class.java)
            val enabledServicesSetting = android.provider.Settings.Secure.getString(
                activity.contentResolver,
                android.provider.Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES
            ) ?: return false
            val colonSplitter = android.text.TextUtils.SimpleStringSplitter(':')
            colonSplitter.setString(enabledServicesSetting)
            while (colonSplitter.hasNext()) {
                val componentNameString = colonSplitter.next()
                val enabledService = android.content.ComponentName.unflattenFromString(componentNameString)
                if (enabledService != null && enabledService == expectedComponentName) {
                    return true
                }
            }
            return false
        }

        @JavascriptInterface
        fun requestAccessibilityService() {
            try {
                val intent = Intent(android.provider.Settings.ACTION_ACCESSIBILITY_SETTINGS)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                activity.startActivity(intent)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        }

    // Worker class to perform scheduled optimization
    class OptimizationWorker(private val appContext: Context, workerParams: WorkerParameters) : Worker(appContext, workerParams) {
        override fun doWork(): androidx.work.ListenableWorker.Result {
            // Perform a simple optimization (no UI feedback)
            try {
                val pm = appContext.packageManager
                val am = appContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
                // Example: kill background processes of non-system apps
                val installed = pm.getInstalledApplications(PackageManager.GET_META_DATA)
                for (appInfo in installed) {
                    val pkg = appInfo.packageName
                    if ((appInfo.flags and ApplicationInfo.FLAG_SYSTEM) == 0) {
                        am.killBackgroundProcesses(pkg)
                    }
                }
                return androidx.work.ListenableWorker.Result.success()
            } catch (e: Exception) {
                e.printStackTrace()
                return androidx.work.ListenableWorker.Result.failure()
            }
        }
    }
}
