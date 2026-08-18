// ============================================================
// 🧩 HERO COMPONENT
// ============================================================

import { APP_CONFIG } from '../data/data.js';

export function renderHero() {
    return `
        <section class="hero-section">
            <div class="hero-glow"></div>
            <div class="hero-content">
                <div class="hero-eyebrow">
                    <span class="eyebrow-line"></span>
                    <span class="eyebrow-text">OPENSEC • FREE CYBERSECURITY LEARNING</span>
                </div>
                
                <h1 class="hero-title">
                    Learn the skill.<br />
                    <span class="hero-highlight">Prove the skill.</span>
                </h1>
                
                <p class="hero-description">
                    A free platform bringing together a structured curriculum, local labs, a Field Manual, 
                    notes, and a final review. It doesn't rely on paid content, and you don't need any 
                    external links to start studying.
                </p>
                
                <div class="hero-actions">
                    <a href="#curriculum" class="btn-primary">
                        START LEARNING <i class="fas fa-arrow-right"></i>
                    </a>
                    <a href="#lab" class="btn-secondary">
                        <i class="fas fa-terminal"></i> OPEN LAB 01
                    </a>
                </div>
                
                <div class="hero-stats">
                    <div class="stat-item">
                        <span class="stat-number">13</span>
                        <span class="stat-label">Weeks</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">100+</span>
                        <span class="stat-label">Labs planned</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">06</span>
                        <span class="stat-label">Core tracks</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number accent">${APP_CONFIG.progress}%</span>
                        <span class="stat-label">Your coverage</span>
                    </div>
                </div>
            </div>
        </section>
    `;
}