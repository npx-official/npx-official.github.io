// ==========================================================
// 🚀 NIGHT PULSE X - ULTIMATE SMART ROUTER (v3.0)
// ==========================================================
(function() {
    const currentPath = window.location.pathname;
    const queryString = window.location.search;
    const cleanPath = currentPath.replace(/\.html$/i, '');

    const ENCRYPTED_PAGES = ['Odyssey'];
    const isEncrypted = ENCRYPTED_PAGES.some(page => currentPath.includes(page));

    if (!isEncrypted && /\.html$/i.test(currentPath) && cleanPath !== '/home') {
        window.history.replaceState({}, '', cleanPath + queryString);
    }

    if (!isEncrypted && (cleanPath === '/' || cleanPath === '/index')) {
        window.history.replaceState({}, '', '/home' + queryString);
        document.documentElement.style.display = 'none';
        setTimeout(() => { document.documentElement.style.display = ''; }, 10);
    }

    if (!isEncrypted && !currentPath.endsWith('.html')) {
        const possibleHtmlPath = cleanPath + '.html';
        fetch(possibleHtmlPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    window.location.replace(possibleHtmlPath + queryString);
                } else {
                    showCustom404();
                }
            })
            .catch(() => {});
    }

    function showCustom404() {
        document.body.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; background:#0a0a0f; color:#e0e5f0; text-align:center; padding:2rem; font-family:'Segoe UI', system-ui, sans-serif;">
            <div style="font-size:8rem; font-weight:900; background: linear-gradient(135deg, #6fffe0, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height:1;">
                404
            </div>
            <h1 style="color:#6fffe0; font-size:2.5rem; margin:1rem 0 0.5rem;">PAGE NOT FOUND</h1>
            <p style="color:rgba(255,255,255,0.5); font-size:1.1rem; margin-bottom:2rem;">
                The signal you are looking for does not exist in this sector.
            </p>
            <a href="/home" style="padding:1rem 2.5rem; background: linear-gradient(135deg, #6fffe0, #a78bfa); color:#0a0a0f; text-decoration:none; border-radius:50px; font-weight:600; font-size:1.1rem; transition:0.3s; display:inline-flex; align-items:center; gap:10px;">
                <i class="fas fa-arrow-left"></i> Return to Home
            </a>
        </div>
        `;
    }

    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== 'index.html' && href !== 'home.html' && !isEncrypted) {
                const newHref = href.replace(/\.html$/i, '');
                link.setAttribute('href', newHref);
            }
        });
    });

    console.log('✅ NPX Ultimate Router loaded successfully!');
})();
