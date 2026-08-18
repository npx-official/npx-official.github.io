// ============================================================
// 🧩 TRACKS COMPONENT
// ============================================================

import { TRACKS } from '../data/data.js';
import { padNumber, cn } from '../utils/helpers.js';

export function renderTracks({ openTrack = 'WEB', onToggle = () => {} } = {}) {
    return `
        <section class="tracks-section" id="academy">
            <div class="section-header">
                <div>
                    <span class="section-eyebrow">01 / ACADEMY</span>
                    <h2>Choose your attack surface</h2>
                </div>
                <span class="section-meta">MEGA NAVIGATION</span>
            </div>
            
            <div class="tracks-grid">
                ${TRACKS.map(track => {
                    const isOpen = openTrack === track.code;
                    return `
                        <div class="track-card ${isOpen ? 'active' : ''}" data-track="${track.code}">
                            <button class="track-toggle" data-track="${track.code}">
                                <div class="track-icon icon-${track.color}">
                                    <i class="fas ${track.icon}"></i>
                                </div>
                                <div class="track-info">
                                    <div class="track-header">
                                        <span class="track-name">${track.name}</span>
                                        <span class="track-code">${track.code}</span>
                                    </div>
                                    <p class="track-desc">${track.description}</p>
                                </div>
                                <i class="fas fa-chevron-down track-arrow"></i>
                            </button>
                            
                            <div class="track-content ${isOpen ? 'active' : ''}" data-track="${track.code}">
                                <div class="track-lessons">
                                    ${track.lessons.map((lesson, index) => `
                                        <a href="#" class="lesson-link" data-lesson="${lesson}">
                                            <span class="lesson-number">${padNumber(index + 1)}</span>
                                            ${lesson}
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </section>
    `;
}
