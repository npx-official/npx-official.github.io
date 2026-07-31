// إخفاء .html من الرابط تلقائيًا
if (window.location.pathname.endsWith('.html') && !window.location.pathname.includes('index.html')) {
    window.history.replaceState({}, '', window.location.pathname.replace('.html', ''));
}
