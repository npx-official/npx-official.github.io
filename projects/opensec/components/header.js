// ============================================================
// 🧩 HEADER COMPONENT
// ============================================================

import { APP_CONFIG } from '../data/data.js';
import { cn } from '../utils/helpers.js';

export function renderHeader() {
    return `
        <header class="app-header">
            <div class="header-inner">
                <a href="#top" class="logo">
                    <span class="logo-dot"></span>
                    <span class="logo-text">NIGHT PULSE X - OPENSEC</span>
                </a>
                
                <div class="header-divider"></div>
                
                <div class="header-search">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search techniques, labs, CVEs..." />
                </div>
                
                <div class="header-badge">
                    <span class="badge primary">${APP_CONFIG.weeksLabel}</span>
                    <span class="badge version">${APP_CONFIG.version}</span>
                </div>
            </div>
        </header>
    `;
}
