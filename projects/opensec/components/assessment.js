// ============================================================
// 🧩 ASSESSMENT COMPONENT
// ============================================================

import { APP_CONFIG, CHALLENGES, COVERAGE } from '../data/data.js';
import { getProgressColor, getChallengeStatus, cn } from '../utils/helpers.js';

export function renderAssessment({ assessmentStarted = false, onToggle = () => {} } = {}) {
    return `
        <section class="grid gap-8 py-12 lg:grid-cols-[1fr_1fr]" id="progress">
            <!-- Coverage -->
            <div>
                <div class="section-header">
                    <div>
                        <span class="section-eyebrow">03 / COVERAGE INDEX</span>
                        <h2>Know where you stand</h2>
                    </div>
                    <span class="section-meta">LIVE PROFILE</span>
                </div>
                
                <div class="rounded-lg border border-border bg-card p-5">
                    ${COVERAGE.map(([label, value]) => `
                        <div class="coverage-item">
                            <div class="coverage-header">
                                <span>${label}</span>
                                <span class="coverage-value">${value}%</span>
                            </div>
                            <div class="progress-bar-sm">
                                <div class="progress-fill-sm ${getProgressColor(value)}" style="width: ${value}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Readiness -->
            <div>
                <div class="section-header">
                    <div>
                        <span class="section-eyebrow">04 / READINESS</span>
                        <h2>Assessment console</h2>
                    </div>
                    <span class="section-meta">PRACTITIONER PATH</span>
                </div>
                
                <div class="rounded-lg border border-border bg-card p-5">
                    <div class="assessment-score">
                        <div class="score-circle">
                            ${APP_CONFIG.assessmentScore}%
                        </div>
                        <div>
                            <div class="score-title">${APP_CONFIG.assessmentStatus}</div>
                            <div class="score-subtitle">${APP_CONFIG.checkpointsReady} checkpoints ready for review</div>
                        </div>
                    </div>
                    
                    ${CHALLENGES.map((item, index) => {
                        const status = getChallengeStatus(index, CHALLENGES.length);
                        const isPass = status === 'PASS';
                        return `
                            <div class="challenge-item">
                                <span class="challenge-dot ${isPass ? 'pass' : 'review'}"></span>
                                ${item}
                                <span class="challenge-status">${status}</span>
                            </div>
                        `;
                    }).join('')}
                    
                    <button class="btn-assessment" id="assessment-toggle">
                        ${assessmentStarted ? 'ASSESSMENT ACTIVE' : 'START READINESS REVIEW'}
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
        </section>
    `;
}
