package com.example.luna

import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.graphics.PixelFormat
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.view.Gravity
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.core.app.NotificationCompat
import kotlin.math.max
import kotlin.math.min

class FloatingCatService : Service() {

    private lateinit var windowManager: WindowManager
    private lateinit var webView: WebView
    private lateinit var layoutParams: WindowManager.LayoutParams
    
    private var catSizeDp = 80
    private var skin = "patched"
    private var sizeStr = "medium"

    private val handler = Handler(Looper.getMainLooper())
    private var movementRunnable: Runnable? = null
    private var isWalking = false
    private var animator: ValueAnimator? = null

    private var screenWidth = 0
    private var screenHeight = 0

    private var originalX = 0
    private var originalY = 0

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
        updateScreenBounds()
        createNotificationChannel()
    }

    private fun updateScreenBounds() {
        val displayMetrics = resources.displayMetrics
        screenWidth = displayMetrics.widthPixels
        screenHeight = displayMetrics.heightPixels
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                "floating_cat_channel",
                "Mascota Virtual (Michi)",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Mantiene activo al gatito sobre tu pantalla"
            }
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    private fun buildNotification(): Notification {
        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
        return NotificationCompat.Builder(this, "floating_cat_channel")
            .setContentTitle("Michi está de visita")
            .setContentText("El gatito está paseando por tu pantalla. ¡Tócalo!")
            .setSmallIcon(applicationInfo.icon)
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .build()
    }

    @SuppressLint("SetJavaScriptEnabled", "ClickableViewAccessibility")
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Start as foreground service
        val notification = buildNotification()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            if (Build.VERSION.SDK_INT >= 34) {
                startForeground(
                    1001,
                    notification,
                    android.content.pm.ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE
                )
            } else {
                startForeground(1001, notification)
            }
        } else {
            startForeground(1001, notification)
        }

        // Parse new intent parameters
        val newSkin = intent?.getStringExtra("skin") ?: "patched"
        val newSize = intent?.getStringExtra("size") ?: "medium"
        
        skin = newSkin
        sizeStr = newSize
        catSizeDp = when (newSize) {
            "small" -> 60
            "large" -> 100
            else -> 80
        }

        if (!::webView.isInitialized) {
            initFloatingView()
            startMovementLoop()
        } else {
            // Service already running, update WebView URL and resize window
            updateScreenBounds()
            val sizePx = dpToPx(catSizeDp)
            layoutParams.width = sizePx
            layoutParams.height = sizePx
            try {
                windowManager.updateViewLayout(webView, layoutParams)
            } catch (e: Exception) {
                e.printStackTrace()
            }
            webView.loadUrl("file:///android_asset/cat_overlay.html?skin=$skin&size=$sizeStr")
        }

        return START_NOT_STICKY
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initFloatingView() {
        val sizePx = dpToPx(catSizeDp)
        
        // Setup Webview
        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            setBackgroundColor(Color.TRANSPARENT)
            webViewClient = WebViewClient()
            addJavascriptInterface(OverlayInterface(), "AndroidAppOverlay")
            loadUrl("file:///android_asset/cat_overlay.html?skin=$skin&size=$sizeStr")
        }

        // Window Layout Params
        val layoutFlag = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        } else {
            @Suppress("DEPRECATION")
            WindowManager.LayoutParams.TYPE_PHONE
        }

        layoutParams = WindowManager.LayoutParams(
            sizePx,
            sizePx,
            layoutFlag,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.TOP or Gravity.LEFT
            // Initial position: center-bottom of screen
            x = (screenWidth - sizePx) / 2
            y = screenHeight - sizePx - dpToPx(120)
        }

        try {
            windowManager.addView(webView, layoutParams)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun startMovementLoop() {
        movementRunnable = object : Runnable {
            override fun run() {
                if (!isWalking) {
                    // Decide action: walk, idle, sleep
                    val roll = (1..100).random()
                    when {
                        roll <= 50 -> {
                            // Walk
                            walkToRandomPosition()
                        }
                        roll <= 80 -> {
                            // Idle/Sit
                            webView.post {
                                webView.evaluateJavascript("setCatState('idle')", null)
                            }
                        }
                        else -> {
                            // Sleep
                            webView.post {
                                webView.evaluateJavascript("setCatState('sleep')", null)
                            }
                        }
                    }
                }
                // Next decision in 6 to 10 seconds
                val nextDelay = (6000..10000).random().toLong()
                handler.postDelayed(this, nextDelay)
            }
        }
        handler.postDelayed(movementRunnable!!, 3000) // start after 3 seconds
    }

    private fun walkToRandomPosition() {
        isWalking = true
        updateScreenBounds()
        
        val sizePx = dpToPx(catSizeDp)
        val targetX = (0..(screenWidth - sizePx)).random()
        val targetY = (dpToPx(80)..(screenHeight - sizePx - dpToPx(100))).random()

        val startX = layoutParams.x
        val startY = layoutParams.y
        val distance = Math.hypot((targetX - startX).toDouble(), (targetY - startY).toDouble())
        
        // Speed: ~80 pixels per second
        val animDuration = max(1500L, min(6000L, (distance / 0.08).toLong()))

        // Inform WebView of walk state and direction (-1 is face left, 1 is face right)
        val direction = if (targetX > startX) 1 else -1
        webView.post {
            webView.evaluateJavascript("setCatState('walk', $direction)", null)
        }

        animator = ValueAnimator.ofFloat(0f, 1f).apply {
            duration = animDuration
            addUpdateListener { animation ->
                val fraction = animation.animatedValue as Float
                layoutParams.x = (startX + (targetX - startX) * fraction).toInt()
                layoutParams.y = (startY + (targetY - startY) * fraction).toInt()
                try {
                    windowManager.updateViewLayout(webView, layoutParams)
                } catch (e: Exception) {
                    // View might be gone
                }
            }
            addListener(object : android.animation.Animator.AnimatorListener {
                override fun onAnimationStart(animation: android.animation.Animator) {}
                override fun onAnimationEnd(animation: android.animation.Animator) {
                    isWalking = false
                    webView.post {
                        webView.evaluateJavascript("setCatState('idle')", null)
                    }
                }
                override fun onAnimationCancel(animation: android.animation.Animator) {
                    isWalking = false
                }
                override fun onAnimationRepeat(animation: android.animation.Animator) {}
            })
            start()
        }
    }

    private fun expandWindowForBubble() {
        // Cancel ongoing walking
        animator?.cancel()
        isWalking = false

        val sizePx = dpToPx(catSizeDp)
        val expandedWidth = dpToPx(180)
        val expandedHeight = dpToPx(130)

        originalX = layoutParams.x
        originalY = layoutParams.y

        // Offset positions so the cat is centered at the bottom of the expanded window
        layoutParams.x = layoutParams.x - (expandedWidth - sizePx) / 2
        layoutParams.y = layoutParams.y - (expandedHeight - sizePx)

        // Bounded within screen
        layoutParams.x = max(0, min(screenWidth - expandedWidth, layoutParams.x))
        layoutParams.y = max(dpToPx(50), min(screenHeight - expandedHeight - dpToPx(50), layoutParams.y))

        layoutParams.width = expandedWidth
        layoutParams.height = expandedHeight

        try {
            windowManager.updateViewLayout(webView, layoutParams)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun shrinkWindowAfterBubble() {
        val sizePx = dpToPx(catSizeDp)
        val expandedWidth = dpToPx(180)
        val expandedHeight = dpToPx(130)

        // Restore window positions from expanded bottom center back to normal
        layoutParams.x = layoutParams.x + (expandedWidth - sizePx) / 2
        layoutParams.y = layoutParams.y + (expandedHeight - sizePx)

        layoutParams.width = sizePx
        layoutParams.height = sizePx

        layoutParams.x = max(0, min(screenWidth - sizePx, layoutParams.x))
        layoutParams.y = max(dpToPx(50), min(screenHeight - sizePx - dpToPx(50), layoutParams.y))

        try {
            windowManager.updateViewLayout(webView, layoutParams)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun dpToPx(dp: Int): Int {
        return (dp * resources.displayMetrics.density).toInt()
    }

    override fun onDestroy() {
        super.onDestroy()
        animator?.cancel()
        if (movementRunnable != null) {
            handler.removeCallbacks(movementRunnable!!)
        }
        if (::webView.isInitialized) {
            try {
                windowManager.removeView(webView)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    inner class OverlayInterface {
        @JavascriptInterface
        fun onCatTapped() {
            handler.post {
                expandWindowForBubble()
            }
        }

        @JavascriptInterface
        fun onBubbleHidden() {
            handler.post {
                shrinkWindowAfterBubble()
            }
        }

        @JavascriptInterface
        fun getQuotes(): String {
            val prefs = getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)
            return prefs.getString("quotes", "[]") ?: "[]"
        }
    }
}
