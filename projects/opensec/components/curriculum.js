// ============================================================
// 🧩 CURRICULUM COMPONENT
// ============================================================

import { WEEKS } from '../data/data.js';
import { findWeek } from '../utils/helpers.js';

// دالة لعرض محتوى الأسبوع داخل النافذة المنبثقة
function renderWeekContent(weekNumber) {
    const week = findWeek(WEEKS, weekNumber);
    if (!week) return '<p>Week not found</p>';

    return `
        <div style="padding: 1rem;">
            <h2 style="color: var(--accent-green); margin-bottom: 0.5rem;">Week ${weekNumber}: ${week[1]}</h2>
            <p style="color: var(--text-secondary); line-height: 1.8;">${week[3]}</p>
            
            <div style="margin-top: 1.5rem; padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                <p style="color: var(--text-muted); font-size: 0.9rem;">
                    <i class="fas fa-clock" style="color: var(--accent-cyan);"></i> Estimated time: ${week[2]}
                </p>
                <div class="module-checklist" style="margin-top: 1rem;">
                    <div><i class="fas fa-check-circle" style="color: var(--accent-green);"></i> Concept briefing</div>
                    <div><i class="fas fa-check-circle" style="color: var(--accent-green);"></i> Guided practice lab</div>
                    <div><i class="fas fa-check-circle" style="color: var(--accent-green);"></i> Evidence + finding review</div>
                    <div><i class="far fa-circle" style="color: var(--text-muted);"></i> Readiness checkpoint</div>
                </div>
            </div>
            
            <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn-primary" onclick="alert('Starting lab for Week ${weekNumber}...')">
                    <i class="fas fa-play"></i> START LAB
                </button>
                <button class="btn-secondary" onclick="closeWeekOverlay()">
                    <i class="fas fa-times"></i> CLOSE
                </button>
            </div>
        </div>
    `;
}

// دالة لفتح النافذة المنبثقة
window.openWeek = function(weekNumber) {
    const overlay = document.getElementById('week-overlay');
    const content = document.getElementById('week-overlay-content');
    
    if (overlay && content) {
        content.innerHTML = renderWeekContent(weekNumber);
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

// دالة لإغلاق النافذة المنبثقة
window.closeWeekOverlay = function() {
    const overlay = document.getElementById('week-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// الدالة الرئيسية لرسم قسم المنهج
export function renderCurriculum({ selectedWeek = '01', onSelectWeek = () => {} } = {}) {
    const week = findWeek(WEEKS, selectedWeek);
    
    // HTML الخاص بالنافذة المنبثقة
    const overlayHTML = `
        <div id="week-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 9999; justify-content: center; align-items: center; padding: 2rem;">
            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 2rem; position: relative;">
                <button onclick="closeWeekOverlay()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
                <div id="week-overlay-content">
                    <!-- المحتوى سيتم حقنه هنا -->
                </div>
            </div>
        </div>
    `;

    // HTML الرئيسي لقسم المنهج
    const html = `
        <section class="curriculum-section" id="curriculum">
            ${overlayHTML}
            <div class="curriculum-grid">
                <div>
                    <div class="section-header">
                        <div>
                            <span class="section-eyebrow">02 / FULL CURRICULUM</span>
                            <h2>13 weeks + final readiness</h2>
                        </div>
                        <span class="section-meta">264H TOTAL</span>
                    </div>
                    
                    <div class="weeks-list">
                        ${WEEKS.map(([number, title, hours, desc]) => `
                            <button class="week-btn ${selectedWeek === number ? 'active' : ''}" data-week="${number}" onclick="window.handleWeekSelect && window.handleWeekSelect('${number}'); return false;">
                                <span class="week-number">W${number}</span>
                                <div class="week-info">
                                    <span class="week-title">${title}</span>
                                    <span class="week-desc">${desc}</span>
                                </div>
                                <span class="week-hours">${hours}</span>
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="selected-module">
                    <div class="module-header">
                        <span>Selected module</span>
                        <span>W${selectedWeek}</span>
                    </div>
                    
                    <h3 id="selected-week-title">${week ? week[1] : ''}</h3>
                    <p id="selected-week-desc">${week ? week[3] : ''}. Every module connects theory to a scoped lab, evidence collection and a reporting checkpoint.</p>
                    
                    <div class="module-checklist">
                        <div><i class="fas fa-check-circle"></i> Concept briefing</div>
                        <div><i class="fas fa-check-circle"></i> Guided practice lab</div>
                        <div><i class="fas fa-check-circle"></i> Evidence + finding review</div>
                        <div><i class="far fa-circle"></i> Readiness checkpoint</div>
                    </div>
                    
                    <!-- 👇 هنا تم إضافة onclick مباشر ليتجاوز حدث app.js -->
                    <button class="btn-module" data-week="${selectedWeek}" onclick="openWeek('${selectedWeek}')">
                        OPEN WEEK ${selectedWeek} <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>
    `;

    return html;
}
