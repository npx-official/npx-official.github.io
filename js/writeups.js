// ====== ALL WRITEUPS DATA ======
const writeupsData = [
    // ====== LINUX - EASY ======
    { name: 'cctv', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/cctv.html' },
    { name: 'Connected', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/Connected.html' },
    { name: 'Enigma', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/Enigma.html' },
    { name: 'Kobold', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/Kobold.html' },
    { name: 'MonitorsFour', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/MonitorsFour.html' },
    { name: 'Orion', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/Orion.html' },
    { name: 'Paperwork', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/Paperwork.html' },
    { name: 'Reactor', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/Reactor.html' },
    { name: 'Silentium', category: 'linux/easy', level: 'easy', os: 'linux', path: 'writeups/linux/easy/Silentium.html' },
    
    // ====== LINUX - MEDIUM ======
    { name: 'Bedside', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/Bedside.html' },
    { name: 'Checkpoint', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/Checkpoint.html' },
    { name: 'DevArea', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/DevArea.html' },
    { name: 'DevHub', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/DevHub.html' },
    { name: 'Fireflow', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/Fireflow.html' },
    { name: 'Logging', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/Logging.html' },
    { name: 'MakeSense', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/MakeSense.html' },
    { name: 'Overwatch', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/Overwatch.html' },
    { name: 'VariaType', category: 'linux/medium', level: 'medium', os: 'linux', path: 'writeups/linux/medium/VariaType.html' },
    
    // ====== LINUX - HARD ======
    { name: 'Nimbus', category: 'linux/hard', level: 'hard', os: 'linux', path: 'writeups/linux/hard/Nimbus.html' },
    
    // ====== WINDOWS - HARD ======
    { name: 'Garfield', category: 'windows/hard', level: 'hard', os: 'windows', path: 'writeups/windows/hard/Garfield.html' },
    { name: 'Ghostlink', category: 'windows/hard', level: 'hard', os: 'windows', path: 'writeups/windows/hard/Ghostlink.html' },
    
    // ====== WINDOWS - MEDIUM ======
    { name: 'logging', category: 'windows/medium', level: 'medium', os: 'windows', path: 'writeups/windows/medium/logging.html' },
    
    // ====== PROLABS ======
    { name: 'Mythical', category: 'prolabs', level: 'prolabs', os: 'prolabs', path: 'writeups/prolabs/Mythical.html' },
    { name: 'Puppet', category: 'prolabs', level: 'prolabs', os: 'prolabs', path: 'writeups/prolabs/Puppet.html' },
];

// ====== CATEGORY INFO ======
function getCategoryInfo(category) {
    const mapping = {
        'linux/easy': { label: '🐧 Linux Easy', icon: '🟢' },
        'linux/medium': { label: '🐧 Linux Medium', icon: '🟡' },
        'linux/hard': { label: '🐧 Linux Hard', icon: '🔴' },
        'windows/hard': { label: '🪟 Windows Hard', icon: '🔴' },
        'windows/medium': { label: '🪟 Windows Medium', icon: '🟡' },
        'prolabs': { label: '🏆 ProLabs', icon: '⭐' }
    };
    return mapping[category] || { label: category, icon: '📄' };
}

// ====== CREATE WRITEUP CARD ======
function createWriteupCard(writeup) {
    const categoryInfo = getCategoryInfo(writeup.category);
    const card = document.createElement('div');
    card.className = `writeup-card ${writeup.os} ${writeup.level}`;
    
    card.innerHTML = `
        <div class="writeup-header">
            <span class="writeup-icon">${categoryInfo.icon}</span>
            <h4>${writeup.name}</h4>
        </div>
        <div class="writeup-meta">
            <span class="writeup-os">${writeup.os.toUpperCase()}</span>
            <span class="writeup-level">${writeup.level}</span>
        </div>
        <div class="writeup-category">${categoryInfo.label}</div>
        <a href="${writeup.path}" class="writeup-link">
            Read Writeup <i class="fas fa-arrow-right"></i>
        </a>
    `;
    return card;
}

// ====== FILTER ======
let currentFilter = 'all';
let filteredData = [...writeupsData];

function applyFilter(filter) {
    currentFilter = filter;
    const container = document.getElementById('allWriteups');
    if (!container) return;
    
    if (filter === 'all') {
        filteredData = [...writeupsData];
    } else {
        filteredData = writeupsData.filter(w => {
            const category = w.category || '';
            const level = w.level || '';
            const os = w.os || '';
            return category.includes(filter) || level.includes(filter) || os.includes(filter);
        });
    }
    
    container.innerHTML = '';
    filteredData.forEach(writeup => {
        container.appendChild(createWriteupCard(writeup));
    });
}

// ====== LOAD ALL WRITEUPS ======
function loadAllWriteups() {
    const container = document.getElementById('allWriteups');
    const statsContainer = document.getElementById('writeupsStats');
    if (!container) return;
    
    if (statsContainer) {
        const total = writeupsData.length;
        const linuxCount = writeupsData.filter(w => w.os === 'linux').length;
        const windowsCount = writeupsData.filter(w => w.os === 'windows').length;
        const prolabsCount = writeupsData.filter(w => w.os === 'prolabs').length;
        
        statsContainer.innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${total}</span>
                <span class="stat-label">Total</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${linuxCount}</span>
                <span class="stat-label">🐧 Linux</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${windowsCount}</span>
                <span class="stat-label">🪟 Windows</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${prolabsCount}</span>
                <span class="stat-label">🏆 ProLabs</span>
            </div>
        `;
    }
    
    applyFilter('all');
    setupFilters();
}

// ====== SETUP FILTERS ======
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyFilter(this.dataset.filter);
        });
    });
}

// ====== FEATURED (for homepage) ======
// ====== FEATURED (for homepage) ======
function loadFeaturedWriteups() {
    const container = document.getElementById('featuredWriteups');
    if (!container) return;
    
    // 🔥 عرض فقط: ProLabs و Hard
    const featured = writeupsData.filter(w => 
        w.level === 'hard' || 
        w.level === 'prolabs' || 
        w.os === 'prolabs'
    );
    
    // رتبهم (ProLabs أولاً، ثم Hard)
    featured.sort((a, b) => {
        if (a.os === 'prolabs' && b.os !== 'prolabs') return -1;
        if (a.os !== 'prolabs' && b.os === 'prolabs') return 1;
        return a.name.localeCompare(b.name);
    });
    
    container.innerHTML = '';
    featured.forEach(writeup => {
        container.appendChild(createWriteupCard(writeup));
    });
}
// ====== EXPOSE FUNCTIONS ======
window.loadAllWriteups = loadAllWriteups;
window.loadFeaturedWriteups = loadFeaturedWriteups;

console.log(`📚 Loaded ${writeupsData.length} writeups`);
console.log(`🐧 Linux: ${writeupsData.filter(w => w.os === 'linux').length}`);
console.log(`🪟 Windows: ${writeupsData.filter(w => w.os === 'windows').length}`);
console.log(`🏆 ProLabs: ${writeupsData.filter(w => w.os === 'prolabs').length}`);
