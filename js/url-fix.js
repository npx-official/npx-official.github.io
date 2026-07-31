// إخفاء .html من الرابط (إصدار متقدم يتجاهل حالة الأحرف)
(function() {
    const currentPath = window.location.pathname;
    if (/\.html$/i.test(currentPath)) {
        const newPath = currentPath.replace(/\.html$/i, "");
        if (newPath !== currentPath) {
            window.history.replaceState({}, "", newPath);
        }
    }
})();
