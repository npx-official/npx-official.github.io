// =============================================
// 🚀 NPX - CLEAN SMART ROUTER
// =============================================
(function() {
    const currentPath = window.location.pathname;

    if (/\.html$/i.test(currentPath) && !currentPath.includes('index.html')) {
        const newPath = currentPath.replace(/\.html$/i, '');
        window.history.replaceState({}, '', newPath);
    }

    if (currentPath === '/' || currentPath === '/index.html') {
        window.history.replaceState({}, '', '/home');
    }

    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== 'index.html' && href !== 'home.html') {
                link.setAttribute('href', href.replace(/\.html$/i, ''));
            }
        });
    });

    console.log('✅ Clean NPX Router loaded!');
})();
