// إخفاء .html من الرابط
if (window.location.pathname.endsWith('.html')) {
    const newPath = window.location.pathname.replace('.html', '');
    window.history.replaceState({}, '', newPath);
}
