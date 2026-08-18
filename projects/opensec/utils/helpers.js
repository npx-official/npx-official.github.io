// ============================================================
// 🛠️ HELPER FUNCTIONS
// ============================================================

// دمج الفئات
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

// تنسيق الأرقام
export function padNumber(num, length = 2) {
    return String(num).padStart(length, '0');
}

// الحصول على أيقونة العنصر
export function getIconForNav(label) {
    const icons = {
        'METHODOLOGY': 'fa-sitemap',
        'WEB / API': 'fa-globe',
        'NETWORK': 'fa-network-wired',
        'LINUX': 'fa-terminal',
        'WINDOWS': 'fa-server',
        'ACTIVE DIRECTORY': 'fa-lock',
        'CLOUD': 'fa-cloud',
        'RESEARCH': 'fa-search',
        'PRACTICE': 'fa-play',
        'REFERENCE': 'fa-book'
    };
    return icons[label] || 'fa-circle';
}

// تحديد لون التقدم
export function getProgressColor(value) {
    if (value > 60) return 'primary';
    if (value > 30) return 'accent';
    return 'destructive';
}

// تحديد حالة التحدي
export function getChallengeStatus(index, total) {
    if (index < total - 1) return 'PASS';
    return 'REVIEW';
}

// البحث عن أسبوع
export function findWeek(weeks, number) {
    return weeks.find(week => week[0] === number);
}

// البحث عن مسار
export function findTrack(tracks, code) {
    return tracks.find(track => track.code === code) || tracks[0];
}

// توليد HTML آمن
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// تخزين محلي مع دعم SSR
export function getLocalStorage(key, defaultValue) {
    try {
        const value = localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : defaultValue;
    } catch {
        return defaultValue;
    }
}

export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {}
}

// منع التكرار في الأحداث
export function debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}