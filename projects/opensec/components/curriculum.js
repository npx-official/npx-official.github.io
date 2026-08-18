// ============================================================
// 🧩 CURRICULUM COMPONENT
// ============================================================

import { WEEKS } from '../data/data.js';
import { findWeek, cn } from '../utils/helpers.js';

export function renderCurriculum({ selectedWeek = '01', onSelectWeek = () => {} } = {}) {
    const week = findWeek(WEEKS, selectedWeek);
    
    return `
        <section class="curriculum-section" id="curriculum">
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
                            <button class="week-btn ${selectedWeek === number ? 'active' : ''}" data-week="${number}">
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
                    
                    <button class="btn-module" data-week="${selectedWeek}">
                        OPEN WEEK ${selectedWeek} <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>
    `;
}
