package com.example.luna

import android.accessibilityservice.AccessibilityService
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import org.json.JSONArray
import java.util.ArrayDeque

class AutoCleanService : AccessibilityService() {

    private var currentPackageName = ""
    private var currentState = STATE_IDLE
    var isActionPending = false

    private fun performDelayedClick(node: AccessibilityNodeInfo, nextState: Int, delay: Long = 800L, onComplete: (() -> Unit)? = null) {
        isActionPending = true
        currentState = nextState
        handler.postDelayed({
            try {
                node.performAction(AccessibilityNodeInfo.ACTION_CLICK)
            } catch (e: Exception) {
                Log.e("AutoCleanService", "Error clicking node", e)
            }
            isActionPending = false
            onComplete?.invoke()
        }, delay)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        if (!isRunning || event.packageName == null) return
        if (isActionPending) return

        // We only respond to Settings app events
        val eventPackage = event.packageName.toString()
        if (eventPackage != "com.android.settings") return

        val rootNode = rootInActiveWindow ?: return

        // Reset timeout on event
        resetTimeout()

        when (currentState) {
            STATE_CLICK_FORCE_STOP -> {
                // Look for "Forzar detención" button
                val forceStopTexts = listOf("forzar detención", "forzar cierre", "detener", "force stop", "force close", "detener aplicación")
                val forceStopNode = findNodeByText(rootNode, forceStopTexts, clickableOnly = true)
                if (forceStopNode != null) {
                    if (forceStopNode.isEnabled) {
                        Log.d("AutoCleanService", "Clicking Force Stop button (delayed)")
                        performDelayedClick(forceStopNode, STATE_CONFIRM_FORCE_STOP)
                    } else {
                        Log.d("AutoCleanService", "Force Stop is already disabled. Skipping to Storage (delayed).")
                        // If force stop is disabled, we skip to Storage directly
                        isActionPending = true
                        currentState = STATE_CLICK_STORAGE
                        handler.postDelayed({
                            isActionPending = false
                            clickStorageButton(rootNode)
                        }, 800)
                    }
                } else {
                    // Try to click storage directly if Force Stop button is not found
                    Log.d("AutoCleanService", "Force Stop button not found, searching for Storage (delayed).")
                    isActionPending = true
                    currentState = STATE_CLICK_STORAGE
                    handler.postDelayed({
                        isActionPending = false
                        clickStorageButton(rootNode)
                    }, 800)
                }
            }

            STATE_CONFIRM_FORCE_STOP -> {
                // Look for "Aceptar" or "OK" in confirmation dialog
                val confirmTexts = listOf("aceptar", "ok", "forzar detención", "forzar cierre", "sí", "yes", "confirmar")
                val confirmNode = findNodeByText(rootNode, confirmTexts, clickableOnly = true)
                if (confirmNode != null) {
                    Log.d("AutoCleanService", "Confirming Force Stop in dialog (delayed)")
                    performDelayedClick(confirmNode, STATE_CLICK_STORAGE)
                } else {
                    // Fallback: if dialog doesn't appear or cannot find OK, check if we can click storage
                    isActionPending = true
                    currentState = STATE_CLICK_STORAGE
                    handler.postDelayed({
                        isActionPending = false
                        clickStorageButton(rootNode)
                    }, 800)
                }
            }

            STATE_CLICK_STORAGE -> {
                clickStorageButton(rootNode)
            }

            STATE_CLICK_CLEAR_CACHE -> {
                // Look for "Borrar caché" button
                val clearCacheTexts = listOf("borrar caché", "limpiar caché", "borrar cache", "limpiar cache", "clear cache", "delete cache")
                val clearCacheNode = findNodeByText(rootNode, clearCacheTexts, clickableOnly = true)
                if (clearCacheNode != null) {
                    if (clearCacheNode.isEnabled) {
                        Log.d("AutoCleanService", "Clicking Clear Cache button (delayed)")
                        performDelayedClick(clearCacheNode, STATE_BACK, delay = 800L) {
                            // Extra safety delay to let the OS clear cache before executing back navigation
                            isActionPending = true
                            handler.postDelayed({
                                isActionPending = false
                                goBackAndNext()
                            }, 1000)
                        }
                    } else {
                        Log.d("AutoCleanService", "Clear Cache already disabled (0 Bytes) (delayed)")
                        isActionPending = true
                        currentState = STATE_BACK
                        handler.postDelayed({
                            isActionPending = false
                            goBackAndNext()
                        }, 800)
                    }
                } else {
                    // If not found, just go back
                    Log.d("AutoCleanService", "Clear Cache button not found, returning (delayed)")
                    isActionPending = true
                    currentState = STATE_BACK
                    handler.postDelayed({
                        isActionPending = false
                        goBackAndNext()
                    }, 800)
                }
            }
            
            STATE_BACK -> {
                // Wait for back actions to complete
            }
        }
    }

    private fun clickStorageButton(rootNode: AccessibilityNodeInfo) {
        val storageTexts = listOf("almacenamiento", "almacenamiento y caché", "espacio", "storage", "storage & cache", "memoria")
        val storageNode = findNodeByText(rootNode, storageTexts, clickableOnly = false) // Can be unclickable text inside a clickable parent
        if (storageNode != null) {
            val targetClickable = findClickableAncestor(storageNode)
            if (targetClickable != null) {
                Log.d("AutoCleanService", "Clicking Storage category (delayed)")
                performDelayedClick(targetClickable, STATE_CLICK_CLEAR_CACHE)
            } else {
                Log.d("AutoCleanService", "Storage node ancestor not clickable, returning (delayed)")
                isActionPending = true
                currentState = STATE_BACK
                handler.postDelayed({
                    isActionPending = false
                    goBackAndNext()
                }, 800)
            }
        } else {
            Log.d("AutoCleanService", "Storage category button not found, returning (delayed)")
            isActionPending = true
            currentState = STATE_BACK
            handler.postDelayed({
                isActionPending = false
                goBackAndNext()
            }, 800)
        }
    }

    private fun findNodeByText(root: AccessibilityNodeInfo, targetTexts: List<String>, clickableOnly: Boolean): AccessibilityNodeInfo? {
        val queue = ArrayDeque<AccessibilityNodeInfo>()
        queue.add(root)
        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()
            val text = (node.text ?: node.contentDescription)?.toString()?.lowercase()
            if (text != null) {
                for (target in targetTexts) {
                    if (text == target.lowercase() || (clickableOnly && text.contains(target.lowercase()))) {
                        if (!clickableOnly || node.isClickable || findClickableAncestor(node) != null) {
                            return node
                        }
                    }
                }
            }
            for (i in 0 until node.childCount) {
                node.getChild(i)?.let { queue.add(it) }
            }
        }
        return null
    }

    private fun findClickableAncestor(node: AccessibilityNodeInfo?): AccessibilityNodeInfo? {
        var temp = node
        while (temp != null) {
            if (temp.isClickable) return temp
            temp = temp.parent
        }
        return null
    }

    private fun resetTimeout() {
        handler.removeCallbacks(timeoutRunnable)
        handler.postDelayed(timeoutRunnable, 6000) // 6 seconds timeout
    }

    private fun goBackAndNext() {
        handler.removeCallbacks(timeoutRunnable)
        if (!isRunning) return
        
        Log.d("AutoCleanService", "Navigating back to Settings")
        isActionPending = true
        performGlobalAction(GLOBAL_ACTION_BACK)
        
        // Settings details page has nested storage view, we need another back button click to return to the package Details page or launcher
        handler.postDelayed({
            performGlobalAction(GLOBAL_ACTION_BACK)
            handler.postDelayed({
                isActionPending = false
                onPackageCleaned(this)
            }, 600) // Slightly increased delay for stability
        }, 600) // Slightly increased delay for stability
    }

    override fun onInterrupt() {
        isRunning = false
    }

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(timeoutRunnable)
    }

    companion object {
        var isRunning = false
        private var packageQueue = mutableListOf<String>()
        private var currentPackageIndex = 0
        
        // Constants for State Machine
        private const val STATE_IDLE = 0
        private const val STATE_CLICK_FORCE_STOP = 1
        private const val STATE_CONFIRM_FORCE_STOP = 2
        private const val STATE_CLICK_STORAGE = 3
        private const val STATE_CLICK_CLEAR_CACHE = 4
        private const val STATE_BACK = 5

        private val handler = Handler(Looper.getMainLooper())
        
        private var progressCallback: ((Int, Int) -> Unit)? = null

        private val timeoutRunnable = Runnable {
            if (isRunning) {
                Log.d("AutoCleanService", "Timeout cleaning package, force skipping...")
                val service = activeInstance
                if (service != null) {
                    service.isActionPending = true
                    service.performGlobalAction(AccessibilityService.GLOBAL_ACTION_BACK)
                    handler.postDelayed({
                        service.performGlobalAction(AccessibilityService.GLOBAL_ACTION_BACK)
                        handler.postDelayed({
                            service.isActionPending = false
                            onPackageCleaned(service)
                        }, 600)
                    }, 600)
                } else {
                    currentPackageIndex++
                    val context = getAppContext()
                    if (context != null) {
                        cleanNextPackage(context)
                    }
                }
            }
        }

        private var activeInstance: AutoCleanService? = null
        private var applicationContextRef: Context? = null

        private fun getAppContext(): Context? {
            return applicationContextRef ?: activeInstance?.applicationContext
        }

        fun startCleaning(context: Context, packages: List<String>, callback: (Int, Int) -> Unit) {
            packageQueue = packages.toMutableList()
            currentPackageIndex = 0
            progressCallback = callback
            isRunning = true
            applicationContextRef = context.applicationContext
            
            cleanNextPackage(context)
        }

        private fun cleanNextPackage(context: Context) {
            if (!isRunning) return

            progressCallback?.invoke(currentPackageIndex, packageQueue.size)

            if (currentPackageIndex < packageQueue.size) {
                val pkg = packageQueue[currentPackageIndex]
                Log.d("AutoCleanService", "Starting clean for package: $pkg ($currentPackageIndex/${packageQueue.size})")
                
                val instance = activeInstance
                if (instance != null) {
                    instance.currentPackageName = pkg
                    instance.currentState = STATE_CLICK_FORCE_STOP
                    instance.resetTimeout()
                }

                val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
                    data = Uri.parse("package:$pkg")
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                context.startActivity(intent)
            } else {
                Log.d("AutoCleanService", "Cleaning completed!")
                isRunning = false
                progressCallback?.invoke(packageQueue.size, packageQueue.size)
                
                // Return to Ciserli application automatically!
                try {
                    val intent = context.packageManager.getLaunchIntentForPackage(context.packageName)
                    if (intent != null) {
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP)
                        context.startActivity(intent)
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }

        fun onPackageCleaned(context: Context) {
            if (!isRunning) return
            currentPackageIndex++
            cleanNextPackage(context)
        }
    }

    override fun onServiceConnected() {
        super.onServiceConnected()
        activeInstance = this
        Log.d("AutoCleanService", "Service Connected")
    }

    override fun onUnbind(intent: Intent?): Boolean {
        activeInstance = null
        return super.onUnbind(intent)
    }
}
