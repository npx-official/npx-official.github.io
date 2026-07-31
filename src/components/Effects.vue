<script setup>
import { onMounted, onUnmounted } from 'vue'

// تعريف المتغيرات لحفظ المؤقتات والاستماعات
let mouseInterval = null
let mouseMoveHandler = null
let mouseLeaveHandler = null
let mouseEnterHandler = null

onMounted(() => {
    // ==============================
    // 1. تشغيل النجوم
    // ==============================
    function initStars() {
        const container = document.getElementById('stars')
        if (!container) return
        
        // تنظيف النجوم السابقة لتجنب التكرار عند التنقل
        container.innerHTML = ''
        
        // إنشاء 100 نجمة
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div')
            star.className = 'star'
            const size = Math.random() * 3 + 1
            star.style.width = size + 'px'
            star.style.height = size + 'px'
            star.style.left = Math.random() * 100 + '%'
            star.style.top = Math.random() * 100 + '%'
            star.style.setProperty('--d', (2 + Math.random() * 4) + 's')
            star.style.animationDelay = (Math.random() * 5) + 's'
            star.style.opacity = Math.random() * 0.5 + 0.2
            container.appendChild(star)
        }
    }
    
    // ==============================
    // 2. تشغيل تأثير الماوس
    // ==============================
    function initMouse() {
        const trail = document.getElementById("mouseTrail")
        const glow = document.getElementById("mouseGlowEffect")
        if (!trail || !glow) return

        let x = 0, y = 0
        let trailX = 0, trailY = 0

        mouseMoveHandler = (e) => {
            x = e.clientX
            y = e.clientY
            glow.style.left = x + "px"
            glow.style.top = y + "px"
            glow.classList.add("active")
            clearTimeout(window.glowTimeout)
            window.glowTimeout = setTimeout(() => glow.classList.remove("active"), 200)
        }

        mouseLeaveHandler = () => {
            trail.style.opacity = "0"
            glow.style.opacity = "0"
        }

        mouseEnterHandler = () => {
            trail.style.opacity = "1"
            glow.style.opacity = "1"
        }

        document.addEventListener("mousemove", mouseMoveHandler)
        document.addEventListener("mouseleave", mouseLeaveHandler)
        document.addEventListener("mouseenter", mouseEnterHandler)

        mouseInterval = setInterval(() => {
            trailX += (x - trailX) * 0.15
            trailY += (y - trailY) * 0.15
            trail.style.left = trailX + "px"
            trail.style.top = trailY + "px"
        }, 16)
    }

    // ==============================
    // 3. فك تشفير الروابط (لـ Writeups)
    // ==============================
    function decryptLink() {
        const encryptedToken = sessionStorage.getItem('npx_secure_route_writeup')
        if (encryptedToken) {
            // نمسح الرابط من الذاكرة فوراً (لإخفاء الأثر)
            sessionStorage.removeItem('npx_secure_route_writeup')
            
            const SECRET_KEY = "NPX2026SECURE_LINK"
            try {
                const decoded = atob(encryptedToken)
                let originalURL = ''
                for (let i = 0; i < decoded.length; i++) {
                    originalURL += String.fromCharCode(decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
                }
                if (originalURL) {
                    // التوجيه للصفحة الأصلية
                    window.location.href = originalURL
                }
            } catch (e) {
                console.error('Decryption error:', e)
            }
        }
    }

    // تنفيذ الدوال
    initStars()
    initMouse()
    decryptLink()
})

// عند إزالة الصفحة (التنقل بين الصفحات)، نقوم بتنظيف الأحداث
onUnmounted(() => {
    if (mouseInterval) clearInterval(mouseInterval)
    if (mouseMoveHandler) document.removeEventListener("mousemove", mouseMoveHandler)
    if (mouseLeaveHandler) document.removeEventListener("mouseleave", mouseLeaveHandler)
    if (mouseEnterHandler) document.removeEventListener("mouseenter", mouseEnterHandler)
})
</script>

<template>
  <!-- هذا المكون ليس له واجهة، بل يقوم بالعمليات في الخلفية -->
</template>
