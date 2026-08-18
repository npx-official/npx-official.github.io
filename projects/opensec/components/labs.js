// ============================================================
// 🧩 LABS COMPONENT
// ============================================================

import { EVIDENCE_ITEMS, LINK_CARDS } from '../data/data.js';
import { cn } from '../utils/helpers.js';

export function renderLabs({ evidence = ['Open Port'], onToggleEvidence = () => {} } = {}) {
    return `
        <section class="labs-section" id="lab">
            <div class="section-header">
                <div>
                    <span class="section-eyebrow">05 / PRACTICE ENVIRONMENT</span>
                    <h2>Lab 01 — exposed configuration</h2>
                </div>
                <span class="section-meta">SAFE BROWSER SIMULATION</span>
            </div>
            
            <div class="lab-grid">
                <div class="lab-target">
                    <!-- Target Card -->
                    <div class="target-card">
                        <div class="target-header">
                            <i class="fas fa-server"></i>
                            <span>TARGET</span>
                        </div>
                        <div class="target-info">
                            <div><span>Hostname</span><div>app01.lab.local</div></div>
                            <div><span>IP</span><div>10.10.20.15</div></div>
                            <div><span>OS</span><div>Linux</div></div>
                            <div><span>Status</span><div class="status-online">ONLINE</div></div>
                        </div>
                        <div class="target-ports">
                            <span class="port">22 SSH</span>
                            <span class="port">80 HTTP</span>
                            <span class="port">443 HTTPS</span>
                            <span class="port">3306 MYSQL</span>
                        </div>
                    </div>
                    
                    <!-- Evidence Board -->
                    <div class="evidence-board">
                        <div class="evidence-header">
                            <i class="fas fa-clipboard-list"></i>
                            <span>EVIDENCE BOARD</span>
                        </div>
                        <div class="evidence-items">
                            ${EVIDENCE_ITEMS.map(item => `
                                <button class="evidence-tag ${evidence.includes(item) ? 'active' : ''}" data-item="${item}">
                                    ${evidence.includes(item) ? '[+] ' : '[ ] '}${item}
                                </button>
                            `).join('')}
                        </div>
                        <div class="evidence-footer">
                            <span>Observation → <strong>Evidence</strong> → Finding → Impact</span>
                            <span class="evidence-count">${evidence.length} evidence items captured</span>
                        </div>
                    </div>
                </div>
                
                <!-- Terminal -->
                <div class="terminal-container">
                    <div class="terminal-header">
                        <i class="fas fa-terminal"></i>
                        <span>npx@lab:~$</span>
                        <span class="terminal-lab">recon-lab-01 / simulated</span>
                    </div>
                    <div class="terminal-body" id="terminal-output">
                        <div class="terminal-line">Session started: recon-lab-01</div>
                        <div class="terminal-line">Type a command to begin. Try: ls</div>
                    </div>
                    <div class="terminal-input">
                        <span>npx@lab:~$</span>
                        <input type="text" id="command-input" placeholder="try: ls" />
                    </div>
                    <div class="terminal-footer">
                        Tab autocomplete · history enabled · filesystem changes are scoped to this lab
                    </div>
                </div>
            </div>
            
            <!-- Link Cards -->
            <div class="link-cards">
                ${LINK_CARDS.map(card => `
                    <div class="link-card">
                        <i class="fas ${card.icon}"></i>
                        <h4>${card.title} <i class="fas fa-arrow-right"></i></h4>
                        <p>${card.text}</p>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}
