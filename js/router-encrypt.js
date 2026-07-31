// =====================================================
// 🔐 NPX - ADVANCED LINK ENCRYPTION & OBFUSCATION v1.0
// =====================================================
(function() {
    // مفتاح التشفير البسيط (يمكنك تغييره)
    const SECRET_KEY = "NPX2026SECURE";

    // دالة تشفير بسيطة باستخدام XOR و Base64
    function encryptURL(url) {
        let result = '';
        for (let i = 0; i < url.length; i++) {
            result += String.fromCharCode(url.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
        }
        return btoa(result); // تحويل النتيجة إلى Base64
    }

    // دالة فك التشفير
    function decryptURL(encoded) {
        try {
            const decoded = atob(encoded);
            let result = '';
            for (let i = 0; i < decoded.length; i++) {
                result += String.fromCharCode(decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length));
            }
            return result;
        } catch (e) {
            return null;
        }
    }

    // 1. تغيير جميع الروابط في الصفحة إلى روابط مشفرة
    function encryptAllLinks() {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            // تجاهل الروابط الخارجية والروابط المهمة
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto') && href !== 'index.html') {
                const encrypted = encryptURL(href);
                link.setAttribute('data-original', href); // حفظ الرابط الأصلي
                link.setAttribute('href', '#!' + encrypted); // وضع الرابط المشفر
            }
        });
    }

    // 2. عند تحميل الصفحة، التحقق من وجود رابط مشفر في الرابط
    function handleEncryptedRoute() {
        const hash = window.location.hash.substring(2); // إزالة #! من البداية
        if (hash) {
            const originalURL = decryptURL(hash);
            if (originalURL) {
                // إعادة التوجيه إلى الرابط الأصلي
                window.location.href = originalURL;
            } else {
                // إذا كان الرابط غير صالح، عرض صفحة 404
                showSecure404();
            }
        }
    }

    // 3. عرض صفحة 404 آمنة عند فشل فك التشفير
    function showSecure404() {
        document.body.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; background:#0a0a0f; color:#e0e5f0; text-align:center; padding:2rem; font-family:'Segoe UI', system-ui, sans-serif;">
            <div style="font-size:8rem; font-weight:900; background: linear-gradient(135deg, #6fffe0, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height:1;">
                🔐
            </div>
            <h1 style="color:#6fffe0; font-size:2.5rem; margin:1rem 0 0.5rem;">ACCESS DENIED</h1>
            <p style="color:rgba(255,255,255,0.5); font-size:1.1rem; margin-bottom:2rem;">
                The link you are trying to access is encrypted and could not be verified.
            </p>
            <a href="/" style="padding:1rem 2.5rem; background: linear-gradient(135deg, #6fffe0, #a78bfa); color:#0a0a0f; text-decoration:none; border-radius:50px; font-weight:600; font-size:1.1rem; transition:0.3s; display:inline-flex; align-items:center; gap:10px;">
                <i class="fas fa-arrow-left"></i> Return to Home
            </a>
        </div>
        `;
    }

    // 4. تشغيل النظام عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        handleEncryptedRoute(); // التحقق من وجود رابط مشفر في الرابط
        encryptAllLinks(); // تشفير جميع الروابط في الصفحة
    });

    console.log('✅ NPX Advanced Link Encryption loaded!');
})();
