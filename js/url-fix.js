// إخفاء .html من الرابط + تحويل الصفحة الرئيسية إلى /home
(function() {
    const currentPath = window.location.pathname;

    // 1. إخفاء .html من الرابط (كما هو موجود بالفعل)
    if (/\.html$/i.test(currentPath)) {
        const newPath = currentPath.replace(/\.html$/i, '');
        if (newPath !== currentPath) {
            window.history.replaceState({}, '', newPath);
            console.log('URL-fix: تم إخفاء .html من الرابط!');
        }
    }

    // 2. تحويل الصفحة الرئيسية (الجذر أو /index) إلى /home
    // نتحقق مما إذا كان المسار هو "/" أو "/index" (بعد إزالة .html)
    const cleanPath = currentPath.replace(/\.html$/i, '');
    
    // إذا كان المستخدم في الصفحة الرئيسية
    if (cleanPath === '/' || cleanPath === '/index') {
        window.history.replaceState({}, '', '/home');
        console.log('URL-fix: تم تحويل الصفحة الرئيسية إلى /home!');
    }
})();
