import { NAV_ITEMS, APP_CONFIG } from '../data/data.js';

export function renderSidebar({ activePanel = 'Academy' } = {}) {
    return `
        <aside class="app-sidebar" id="app-sidebar">
            <!-- Learning System -->
            <div class="sidebar-learning">
                <div class="learning-header">
                    <i class="fas fa-activity"></i>
                    <span>Learning system</span>
                </div>
                <div class="learning-title">Academy / 01</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${APP_CONFIG.progress}%"></div>
                </div>
                <div class="progress-labels">
                    <span>${APP_CONFIG.progress}% complete</span>
                    <span>${APP_CONFIG.skillsDone} / ${APP_CONFIG.skillsTotal} skills</span>
                </div>
            </div>
            
            <!-- Explore -->
            <div class="sidebar-nav">
                <div class="nav-title">Explore</div>
                ${NAV_ITEMS.map(([label, panel, icon]) => `
                    <a href="#" class="nav-link ${activePanel === panel ? 'active' : ''}" 
                       data-panel="${panel}" 
                       onclick="window.handleNavigate && window.handleNavigate('${panel}'); return false;">
                        <i class="fas ${icon}"></i>
                        <span>${label}</span>
                        ${['WEB / API', 'ACTIVE DIRECTORY'].includes(label) ? '<i class="fas fa-chevron-right"></i>' : ''}
                    </a>
                `).join('')}
            </div>
            
            <!-- FREE LEARNING STACK -->
            <div style="margin-top: 1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">
                <a href="#" class="nav-link ${activePanel === 'Free Learning Stack' ? 'active' : ''}" 
                   data-panel="Free Learning Stack"
                   onclick="window.handleNavigate && window.handleNavigate('Free Learning Stack'); return false;"
                   style="font-weight: 600; color: var(--accent-green);">
                    <i class="fas fa-graduation-cap"></i>
                    <span>FREE LEARNING STACK</span>
                    <i class="fas fa-chevron-right" style="margin-left: auto; font-size: 0.625rem;"></i>
                </a>
            </div>
            <div style="margin-top: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.75rem;">
    <a href="#" class="nav-link ${activePanel === 'Arsenal' ? 'active' : ''}" 
       data-panel="Arsenal"
       onclick="window.handleNavigate && window.handleNavigate('Arsenal'); return false;"
       style="font-weight: 600; color: var(--accent-purple);">
        <i class="fas fa-sword"></i>
        <span>⚔️ ARSENAL</span>
        <i class="fas fa-chevron-right" style="margin-left: auto; font-size: 0.625rem;"></i>
    </a>
</div>
            
            <!-- LABS & STREAK -->
            <div class="sidebar-stats">
                <div class="stat-box">
                    <span class="stat-label">LABS</span>
                    <span class="stat-value">${APP_CONFIG.labsCount}</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">STREAK</span>
                    <span class="stat-value accent">${APP_CONFIG.streak}</span>
                </div>
            </div>
        </aside>
    );
}
