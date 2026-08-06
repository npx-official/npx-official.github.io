const writeupsData = [
    { name: 'cctv', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/cctv', password: 'CCTV!E@sy#2026', icon: '#a8e06e' },
    { name: 'Connected', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/Connected', icon: '#a8e06e' },
    { name: 'Enigma', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/Enigma', icon: '#a8e06e' },
    { name: 'Kobold', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/Kobold', password: 'K0b0ld!E@sy#X5', icon: '#a8e06e' },
    { name: 'MonitorsFour', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/MonitorsFour', icon: '#a8e06e' },
    { name: 'Orion', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/Orion', icon: '#a8e06e' },
    { name: 'Paperwork', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/Paperwork', icon: '#a8e06e' },
    { name: 'Reactor', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/Reactor', icon: '#a8e06e' },
    { name: 'Silentium', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/Silentium', password: 'S1l3nt1um!E@sy#2026', icon: '#a8e06e' },
    { name: 'Cohort', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/Cohort', icon: '#a8e06e' },
   { name: 'TwoMillion', category: 'htb/linux/easy', level: 'easy', os: 'linux', path: '/writeups/htb/linux/easy/TwoMillion',password:'Tw0M1ll10n!E@sy#2026', icon: '#a8e06e' },

    { name: 'Bedside', category: 'htb/linux/medium', level: 'medium', os: 'linux', path: '/writeups/htb/linux/medium/Bedside', icon: '#eac562' },
    { name: 'Checkpoint', category: 'htb/linux/medium', level: 'medium', os: 'linux', path: '/writeups/htb/linux/medium/Checkpoint', icon: '#eac562' },
    { name: 'DevArea', category: 'htb/linux/medium', level: 'medium', os: 'linux', path: '/writeups/htb/linux/medium/DevArea', icon: '#eac562' },
    { name: 'DevHub', category: 'htb/linux/medium', level: 'medium', os: 'linux', path: '/writeups/htb/linux/medium/DevHub', icon: '#eac562' },
    { name: 'Fireflow', category: 'htb/linux/medium', level: 'medium', os: 'linux', path: '/writeups/htb/linux/medium/Fireflow', password: 'F1r3fl0w!M3d1um#X2', icon: '#eac562' },
    { name: 'MakeSense', category: 'htb/linux/medium', level: 'medium', os: 'linux', path: '/writeups/htb/linux/medium/MakeSense', icon: '#eac562' },
    { name: 'Overwatch', category: 'htb/linux/medium', level: 'medium', os: 'linux', path: '/writeups/htb/linux/medium/Overwatch', icon: '#eac562' },
    { name: 'VariaType', category: 'htb/linux/medium', level: 'medium', os: 'linux', path: '/writeups/htb/linux/medium/VariaType', password: 'V@r1@Typ3!M3d1um#2026', icon: '#eac562' },
    
    { name: 'Nimbus', category: 'htb/linux/hard', level: 'hard', os: 'linux', path: '/writeups/htb/linux/hard/Nimbus', icon: '#e05a5a' },
    
    { name: 'logging', category: 'htb/windows/medium', level: 'medium', os: 'windows', path: '/writeups/htb/windows/medium/logging', password: '', icon: '#eac562' },

    { name: 'Garfield', category: 'htb/windows/hard', level: 'hard', os: 'windows', path: '/writeups/htb/windows/hard/Garfield', icon: '#e05a5a' },
    { name: 'Ghostlink', category: 'htb/windows/hard', level: 'hard', os: 'windows', path: '/writeups/htb/windows/hard/Ghostlink', password: 'Gh0stl1nk!W1nd0ws#X5', icon: '#e05a5a' },
    { name: 'DarkZero Returns', category: 'htb/windows/hard', level: 'hard', os: 'windows', path: '/writeups/htb/windows/hard/DarkZeroReturns', icon: '#e05a5a' },
    { name: 'Fries', category: 'htb/windows/hard', level: 'hard', os: 'windows', path: '/writeups/htb/windows/hard/Fries', password: 'Fr13s!H@rd#2026', icon: '#e05a5a' },
 
    { name: 'Odyssey', category: 'htb/windows/insane', level: 'insane', os: 'windows', path: '/writeups/htb/windows/insane/Odyssey', password: '0dys3y!R3turn#Insan3', icon: '#8c8c8c' },

    { name: 'Mythical', category: 'htb/prolabs', level: 'prolabs', os: 'prolabs', path: '/writeups/htb/prolabs/Mythical', icon: '#f5c542' },
    { name: 'Puppet', category: 'htb/prolabs', level: 'prolabs', os: 'prolabs', path: '/writeups/htb/prolabs/Puppet', icon: '#f5c542' },

    { name: 'Beach Bar', category: 'tryhackme/easy', level: 'easy', os: 'Linux', path: '/writeups/tryhackme/easy/Beach Bar', password: '', icon: '#a8e06e' },
    { name: 'Towel on the Sunbed', category: 'tryhackme/medium', level: 'medium', os: 'Linux', path: '/writeups/tryhackme/medium/Towel on the Sunbed', password: '', icon: '#eac562' },
  
    { name: 'Photo Gallery', category: 'hacker101/ctf', level: 'easy', os: 'hacker101', path: '/writeups/hacker101/PhotoGallery', icon: '#a8e06e' },
    { name: 'Micro-CMS v1', category: 'hacker101/ctf', level: 'easy', os: 'hacker101', path: '/writeups/hacker101/MicroCMSv1', icon: '#a8e06e' },
    { name: 'Micro-CMS v2', category: 'hacker101/ctf', level: 'medium', os: 'hacker101', path: '/writeups/hacker101/MicroCMSv2', icon: '#eac562' },
    { name: 'Templated', category: 'hacker101/ctf', level: 'medium', os: 'hacker101', path: '/writeups/hacker101/Templated', icon: '#eac562' },
    { name: 'H1 2022 CTF', category: 'hacker101/ctf', level: 'hard', os: 'hacker101', path: '/writeups/hacker101/H1-2022-CTF', icon: '#e05a5a' },
];

function getCategoryInfo(category) {
    const mapping = {
        'htb/linux/easy': { label: '🐧 HTB Linux Easy', icon: '🟢' },
        'htb/linux/medium': { label: '🐧 HTB Linux Medium', icon: '🟡' },
        'htb/linux/hard': { label: '🐧 HTB Linux Hard', icon: '🔴' },
        'htb/windows/medium': { label: '🪟 HTB Windows Medium', icon: '🟡' },
        'htb/windows/hard': { label: '🪟 HTB Windows Hard', icon: '🔴' },
        'htb/windows/insane': { label: '💀 HTB Windows Insane', icon: '💀' },
        'htb/prolabs': { label: '🏆 HTB ProLabs', icon: '⭐' },
        'tryhackme/easy': { label: '🟢 TryHackMe Easy', icon: '🟢' },
        'tryhackme/medium': { label: '🟡 TryHackMe Medium', icon: '🟡' },
        'tryhackme/hard': { label: '🔴 TryHackMe Hard', icon: '🔴' },
        'hacker101/ctf': { label: '🛡️ Hacker101 CTF', icon: '🛡️' },
    };
    return mapping[category] || { label: category, icon: '📄' };
}

function createWriteupCard(writeup) {
    const categoryInfo = getCategoryInfo(writeup.category);
    const card = document.createElement('div');
    card.className = `writeup-card ${writeup.os} ${writeup.level}`;
    
    let passwordHTML = '';
    if (writeup.password) {
        passwordHTML = `
            <div class="writeup-password">
                <span class="password-text">🔑 ${writeup.password}</span>
                <button class="copy-btn" data-password="${writeup.password}" title="Copy password">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `;
    }
    
    let iconHTML = '';
    if (writeup.icon) {
        iconHTML = `<div class="writeup-dot" style="background-color: ${writeup.icon};"></div>`;
    } else {
        iconHTML = `<span class="writeup-icon">${categoryInfo.icon}</span>`;
    }
    
    card.innerHTML = `
        <div class="writeup-header">
            ${iconHTML}
            <h4>${writeup.name}</h4>
        </div>
        <div class="writeup-meta">
            <span class="writeup-os">${writeup.os.toUpperCase()}</span>
            <span class="writeup-level">${writeup.level}</span>
        </div>
        <div class="writeup-category">${categoryInfo.label}</div>
        ${passwordHTML}
        <a href="${writeup.path}" class="writeup-link">
            Read Writeup <i class="fas fa-arrow-right"></i>
        </a>
    `;
    return card;
}

function getFilterIcon(filter) {
    // أيقونات FontAwesome نظيفة ومطابقة
    const icons = {
        'linux': '<i class="fab fa-linux" style="margin-right:6px;"></i>',
        'windows': '<i class="fab fa-windows" style="margin-right:6px;"></i>',
        'htb': '<i class="fas fa-shield-halved" style="margin-right:6px;"></i>',
        'tryhackme': '<i class="fas fa-user-secret" style="margin-right:6px;"></i>',
        'hacker101': '<i class="fas fa-shield" style="margin-right:6px;"></i>',
        'prolabs': '<i class="fas fa-trophy" style="margin-right:6px;"></i>',
        
        // مطابقة data-filter في ملف HTML
        'htb-easy': '<i class="fas fa-circle" style="color:#a8e06e;margin-right:6px;font-size:0.6rem;"></i>',
        'htb-medium': '<i class="fas fa-circle" style="color:#eac562;margin-right:6px;font-size:0.6rem;"></i>',
        'htb-hard': '<i class="fas fa-circle" style="color:#e05a5a;margin-right:6px;font-size:0.6rem;"></i>',
        'htb-insane': '<i class="fas fa-skull" style="color:#8c8c8c;margin-right:6px;font-size:0.9rem;"></i>',
        
        'tryhackme-easy': '<i class="fas fa-circle" style="color:#a8e06e;margin-right:6px;font-size:0.6rem;"></i>',
        'tryhackme-medium': '<i class="fas fa-circle" style="color:#eac562;margin-right:6px;font-size:0.6rem;"></i>',
        'tryhackme-hard': '<i class="fas fa-circle" style="color:#e05a5a;margin-right:6px;font-size:0.6rem;"></i>',
        'tryhackme-insane': '<i class="fas fa-skull" style="color:#8c8c8c;margin-right:6px;font-size:0.9rem;"></i>',
        
        'hacker101-easy': '<i class="fas fa-circle" style="color:#a8e06e;margin-right:6px;font-size:0.6rem;"></i>',
        'hacker101-medium': '<i class="fas fa-circle" style="color:#eac562;margin-right:6px;font-size:0.6rem;"></i>',
        'hacker101-hard': '<i class="fas fa-circle" style="color:#e05a5a;margin-right:6px;font-size:0.6rem;"></i>',
    };
    return icons[filter] || '';
}

let currentFilter = 'all';

function ensureSubmenuOpen(btn) {
    const subMenu = btn.closest('.sub-filters');
    if (subMenu && !subMenu.classList.contains('show')) {
        document.querySelectorAll('.sub-filters').forEach(el => el.classList.remove('show'));
        subMenu.classList.add('show');
    }
}

function applyFilter(filter) {
    currentFilter = filter;
    const container = document.getElementById('allWriteups');
    if (!container) return;
    
    let filteredData = [];
    
    if (filter === 'all') {
        filteredData = [...writeupsData];
    } else {
        filteredData = writeupsData.filter(w => {
            const cat = w.category || '';
            const level = w.level || '';
            const os = w.os || '';
            
            switch(filter) {
                case 'htb': return cat.startsWith('htb/');
                case 'htb-hard': return cat.startsWith('htb/') && level === 'hard';
                case 'htb-insane': return cat.startsWith('htb/') && level === 'insane';
                case 'htb-easy': return cat.startsWith('htb/') && level === 'easy';
                case 'htb-medium': return cat.startsWith('htb/') && level === 'medium';
                case 'windows': return os === 'windows';
                case 'linux': return os === 'linux';
                case 'prolabs': return os === 'prolabs';
                
                case 'tryhackme': return cat.startsWith('tryhackme/');
                case 'tryhackme-easy': return cat === 'tryhackme/easy';
                case 'tryhackme-medium': return cat === 'tryhackme/medium';
                case 'tryhackme-hard': return cat === 'tryhackme/hard';
                case 'tryhackme-insane': return cat === 'tryhackme/insane';
                
                case 'hacker101': return os === 'hacker101';
                case 'hacker101-easy': return os === 'hacker101' && level === 'easy';
                case 'hacker101-medium': return os === 'hacker101' && level === 'medium';
                case 'hacker101-hard': return os === 'hacker101' && level === 'hard';
                
                default: return cat.includes(filter) || level.includes(filter) || os.includes(filter);
            }
        });
    }
    
    container.innerHTML = '';
    filteredData.forEach(writeup => container.appendChild(createWriteupCard(writeup)));
    
    // تحديث الأيقونات بشكل صحيح
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const plainText = btn.textContent.trim(); // استخراج النص النقي
        
        if (btn.dataset.filter === filter) {
            const icon = getFilterIcon(filter);
            btn.innerHTML = icon + plainText;
            btn.classList.add('active');
        } else {
            btn.innerHTML = plainText; // إعادة النص النقي فقط للأزرار الأخرى
            btn.classList.remove('active');
        }
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            copyPassword(this.getAttribute('data-password'), this);
        });
    });
}

function copyPassword(password, btn) {
    const originalHTML = btn.innerHTML;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(password).then(() => {
            btn.innerHTML = '<i class="fas fa-check" style="color: #00ff88;"></i>';
            setTimeout(() => btn.innerHTML = originalHTML, 1500);
        }).catch(() => fallbackCopy(password, btn, originalHTML));
    } else {
        fallbackCopy(password, btn, originalHTML);
    }
}

function fallbackCopy(password, btn, originalHTML) {
    const textarea = document.createElement('textarea');
    textarea.value = password;
    textarea.style.position = 'fixed'; textarea.style.opacity = '0'; textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        btn.innerHTML = '<i class="fas fa-check" style="color: #00ff88;"></i>';
        setTimeout(() => btn.innerHTML = originalHTML, 1500);
    } catch { alert('Could not copy password.'); }
    document.body.removeChild(textarea);
}

function loadAllWriteups() {
    const container = document.getElementById('allWriteups');
    if (!container) return;
    applyFilter('all');
    setupFilters();
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            ensureSubmenuOpen(this);
            applyFilter(this.dataset.filter);
        });
    });
}

function loadFeaturedWriteups() {
    const container = document.getElementById('featuredWriteups');
    if (!container) return;
    const featured = writeupsData.filter(w => w.level === 'hard' || w.level === 'insane' || w.level === 'prolabs' || w.os === 'prolabs');
    featured.sort((a, b) => {
        if (a.os === 'prolabs' && b.os !== 'prolabs') return -1;
        if (a.os !== 'prolabs' && b.os === 'prolabs') return 1;
        return a.name.localeCompare(b.name);
    });
    container.innerHTML = '';
    featured.forEach(writeup => container.appendChild(createWriteupCard(writeup)));
}

window.loadAllWriteups = loadAllWriteups;
window.loadFeaturedWriteups = loadFeaturedWriteups;

console.log(`📚 Loaded ${writeupsData.length} writeups`);
