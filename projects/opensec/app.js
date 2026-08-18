// ============================================================
// 🚀 NIGHT PULSE X — FULL APP (TERMINAL SEPARATED)
// ============================================================

import { executeAdvancedCommand, terminalState, commandHistory } from './components/terminal.js';

// ── البيانات ──
const APP_CONFIG = {
    appName: 'NIGHT PULSE X',
    version: 'v1.3.0',
    weeksLabel: '13 WEEKS',
    labsCount: 24,
    streak: '07d',
    progress: 42,
    skillsTotal: 43,
    skillsDone: 18,
};

const NAV_ITEMS = [
    ['METHODOLOGY', 'Methodology', 'fa-sitemap'],
    ['WEB / API', 'Web / API', 'fa-globe'],
    ['NETWORK', 'Network', 'fa-network-wired'],
    ['LINUX', 'Linux', 'fa-terminal'],
    ['WINDOWS', 'Windows', 'fa-server'],
    ['ACTIVE DIRECTORY', 'Active Directory', 'fa-lock'],
    ['CLOUD', 'Cloud', 'fa-cloud'],
    ['RESEARCH', 'Research', 'fa-search'],
    ['PRACTICE', 'Practice', 'fa-play'],
    ['REFERENCE', 'Reference', 'fa-book']
];

const TRACKS = [
    { name: 'Core Pentest', code: 'CORE', icon: 'fa-bullseye', color: 'green', description: 'The methodology that turns scattered tools into a repeatable assessment.', lessons: ['Methodology', 'Reconnaissance', 'Enumeration', 'Vulnerability Analysis', 'Exploitation', 'Post Exploitation', 'Reporting'] },
    { name: 'Web / API', code: 'WEB', icon: 'fa-globe', color: 'cyan', description: 'Map requests, sessions and trust boundaries before validating findings.', lessons: ['HTTP', 'Authentication', 'Access Control', 'SQL Injection', 'XSS', 'SSRF', 'API Security', 'Business Logic'] },
    { name: 'Windows / AD', code: 'AD', icon: 'fa-network-wired', color: 'red', description: 'Understand identity, permissions, trust and movement in enterprise labs.', lessons: ['Windows Fundamentals', 'AD Enumeration', 'LDAP', 'Kerberos', 'SMB', 'Delegation', 'ACLs', 'Lateral Movement'] },
    { name: 'Privilege Escalation', code: 'PRIV', icon: 'fa-shield', color: 'orange', description: 'Build situational awareness and find misconfigurations methodically.', lessons: ['Linux Permissions', 'SUID & Capabilities', 'Sudo', 'Services', 'Windows Services', 'Scheduled Tasks', 'PowerShell'] },
    { name: 'Cloud / Containers', code: 'CLOUD', icon: 'fa-layer-group', color: 'purple', description: 'Follow access paths through IAM, metadata, Docker and Kubernetes.', lessons: ['IAM', 'Storage', 'Metadata', 'Docker', 'Kubernetes'] },
    { name: 'Security Research', code: 'RESEARCH', icon: 'fa-brain', color: 'yellow', description: 'Analyze disclosures, source, dependencies and patches responsibly.', lessons: ['CVE Analysis', 'Source Review', 'Dependency Analysis', 'Patch Analysis', 'Responsible PoC Research'] }
];

const WEEKS = [
    ['00', 'Getting Started', '10h', 'Ethics, lab setup, evidence and report fundamentals'],
    ['01', 'Reconnaissance & Scanning', '20h', 'Scope-first discovery, DNS, Nmap and service enumeration'],
    ['02', 'Web Application & API Testing', '24h', 'HTTP mapping, sessions, access control and input handling'],
    ['03', 'SQL Injection & Client-Side Security', '20h', 'Query context, blind reasoning and browser trust boundaries'],
    ['04', 'Vulnerability Research', '20h', 'CVE lifecycle, PoCs, version matching and safe analysis'],
    ['05', 'Credential Security & Defense', '20h', 'Hashes, password auditing, NTLM and detection engineering'],
    ['06', 'Windows & Linux PrivEsc', '24h', 'Permissions, services, tasks, SUID, sudo and PowerShell'],
    ['07', 'Pivoting & SSH Tunneling', '20h', 'Forwarding, SOCKS, segmentation and evidence'],
    ['08', 'Tunneling & Metasploit', '20h', 'Framework architecture, modules, payloads and workflow'],
    ['09', 'Active Directory', '16h', 'LDAP, objects, SPNs, shares, Kerberos and BloodHound'],
    ['10', 'Lateral Movement', '20h', 'WMI, WinRM, SMB, trust paths and detection opportunities'],
    ['11', 'Capstone Assessment', '20h', 'Scope, evidence, findings, remediation, retest and report'],
    ['12', 'Final Practice & Readiness', '20h', 'Time pressure, weak-area review and final knowledge check']
];

// ── الحالة ──
let state = {
    activePanel: 'Academy',
    mobileOpen: false,
    openTrack: 'WEB',
    selectedWeek: '01',
    evidence: ['Open Port'],
    assessmentStarted: false,
    terminalLines: [
        '╔═══════════════════════════════════════╗',
        '║   🔥 Welcome to NIGHT PULSE X Lab   ║',
        '║   Type "help" to see all commands   ║',
        '╚═══════════════════════════════════════╝',
        '',
        'Session started: recon-lab-01',
        'Type a command to begin. Try: ls'
    ],
};

// ── الدوال المساعدة ──
function findWeek(weeks, number) {
    return weeks.find(w => w[0] === number);
}

// ── دوال التنقل ──
window.handleNavigate = function(panel) {
    state.activePanel = panel;
    state.mobileOpen = false;
    renderApp();
};

function handleTrackToggle(trackCode) {
    state.openTrack = state.openTrack === trackCode ? '' : trackCode;
    renderApp();
}

function handleWeekSelect(weekNumber) {
    state.selectedWeek = weekNumber;
    renderApp();
}

function handleEvidenceToggle(item) {
    const index = state.evidence.indexOf(item);
    if (index > -1) {
        state.evidence.splice(index, 1);
    } else {
        state.evidence.push(item);
    }
    renderApp();
}

function handleAssessmentToggle() {
    state.assessmentStarted = !state.assessmentStarted;
    renderApp();
}

function handleTerminalCommand(command) {
    const clean = command.trim();
    if (!clean) return;
    
    const output = executeAdvancedCommand(clean);
    state.terminalLines.push(`student@npx-lab:~$ ${clean}`);
    state.terminalLines.push(output);
    renderApp();
}

// ============================================================
// 📄 PAGE RENDERERS
// ============================================================

function renderMethodologyPage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-green"><i class="fas fa-sitemap"></i></div>
                <div class="section-title">Methodology</div>
                <div class="section-meta">📋 FRAMEWORK</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Red Team Methodology</h3>
                <p style="color: var(--text-secondary); line-height: 1.8;">A structured approach to authorized security testing:</p>
                <ol style="color: var(--text-secondary); line-height: 2; padding-left: 1.5rem; margin-top: 1rem;">
                    <li><strong style="color: var(--text-primary);">Scope Definition</strong> — Define assets, rules, and boundaries</li>
                    <li><strong style="color: var(--text-primary);">Reconnaissance</strong> — Gather intelligence about the target</li>
                    <li><strong style="color: var(--text-primary);">Enumeration</strong> — Identify services and attack vectors</li>
                    <li><strong style="color: var(--text-primary);">Vulnerability Analysis</strong> — Find security weaknesses</li>
                    <li><strong style="color: var(--text-primary);">Exploitation</strong> — Validate findings safely</li>
                    <li><strong style="color: var(--text-primary);">Post-Exploitation</strong> — Assess impact and persistence</li>
                    <li><strong style="color: var(--text-primary);">Reporting</strong> — Document findings and remediation</li>
                </ol>
                <div style="margin-top: 1.5rem; padding: 1rem; border-left: 3px solid var(--accent-green); background: rgba(0,255,183,0.04); border-radius: 0.375rem;">
                    <p style="color: var(--text-muted); font-size: 0.85rem;">
                        <i class="fas fa-info-circle" style="color: var(--accent-green);"></i>
                        Always operate within authorized scope and follow rules of engagement.
                    </p>
                </div>
            </div>
        </section>
    `;
}

function renderNetworkPage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-cyan"><i class="fas fa-network-wired"></i></div>
                <div class="section-title">Network Security</div>
                <div class="section-meta">🌐 INFRASTRUCTURE</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Network Attack Surface</h3>
                <div class="grid grid-2">
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">Reconnaissance</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Nmap scanning</li>
                            <li>DNS enumeration</li>
                            <li>Subdomain discovery</li>
                            <li>Certificate transparency</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">Enumeration</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Port scanning</li>
                            <li>Service fingerprinting</li>
                            <li>OS detection</li>
                            <li>Vulnerability scanning</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">Key Services</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>HTTP/HTTPS (80,443)</li>
                            <li>SSH (22)</li>
                            <li>SMB (139,445)</li>
                            <li>RDP (3389)</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">Defensive Focus</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Segment networks</li>
                            <li>Least privilege</li>
                            <li>Monitor logs</li>
                            <li>Patch regularly</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderLinuxPage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-orange"><i class="fab fa-linux"></i></div>
                <div class="section-title">Linux Security</div>
                <div class="section-meta">🐧 OS</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Linux Privilege Escalation</h3>
                <div class="grid grid-2">
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔍 Enumeration</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Kernel version</li>
                            <li>SUID/SGID binaries</li>
                            <li>Sudo permissions</li>
                            <li>Cron jobs</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">⚡ Privilege Escalation</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>SUID abuse</li>
                            <li>Sudo exploitation</li>
                            <li>Kernel exploits</li>
                            <li>Password reuse</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🛡️ Defensive</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Least privilege</li>
                            <li>AppArmor/SELinux</li>
                            <li>Regular updates</li>
                            <li>Audit logging</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔧 Tools</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>LinPEAS</li>
                            <li>pspy</li>
                            <li>gtfobins</li>
                            <li>linux-exploit-suggester</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderWindowsPage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-cyan"><i class="fab fa-windows"></i></div>
                <div class="section-title">Windows Security</div>
                <div class="section-meta">🪟 OS</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Windows Privilege Escalation</h3>
                <div class="grid grid-2">
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔍 Enumeration</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>System info</li>
                            <li>User privileges</li>
                            <li>Service permissions</li>
                            <li>Registry analysis</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">⚡ Privilege Escalation</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>SeImpersonatePrivilege</li>
                            <li>Unquoted service paths</li>
                            <li>AlwaysInstallElevated</li>
                            <li>UAC bypass</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🛡️ Defensive</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Least privilege</li>
                            <li>AppLocker</li>
                            <li>Windows Defender</li>
                            <li>Audit policies</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔧 Tools</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>winPEAS</li>
                            <li>PowerUp</li>
                            <li>Seatbelt</li>
                            <li>Mimikatz</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderADPage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-red"><i class="fas fa-lock"></i></div>
                <div class="section-title">Active Directory</div>
                <div class="section-meta">🏢 AD</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Active Directory Security</h3>
                <div class="grid grid-2">
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔍 Enumeration</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Domain users</li>
                            <li>Domain groups</li>
                            <li>Service accounts</li>
                            <li>Trust relationships</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">⚡ Attacks</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Kerberoasting</li>
                            <li>ASREPRoasting</li>
                            <li>BloodHound analysis</li>
                            <li>DCSync</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🛡️ Defensive</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Least privilege</li>
                            <li>LAPS</li>
                            <li>Monitor logs</li>
                            <li>AD hardening</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔧 Tools</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>BloodHound</li>
                            <li>PowerView</li>
                            <li>SharpHound</li>
                            <li>Certipy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderCloudPage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-purple"><i class="fas fa-cloud"></i></div>
                <div class="section-title">Cloud Security</div>
                <div class="section-meta">☁️ CLOUD</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Cloud & Container Security</h3>
                <div class="grid grid-2">
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔍 IAM</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>IAM policies</li>
                            <li>Service accounts</li>
                            <li>Role assignments</li>
                            <li>Privilege analysis</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">📦 Containers</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Docker security</li>
                            <li>Kubernetes RBAC</li>
                            <li>Image scanning</li>
                            <li>Secret management</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🛡️ Defensive</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Least privilege</li>
                            <li>Network policies</li>
                            <li>Audit logging</li>
                            <li>Secrets rotation</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔧 Tools</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>ScoutSuite</li>
                            <li>Prowler</li>
                            <li>Trivy</li>
                            <li>kube-hunter</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderResearchPage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-yellow"><i class="fas fa-brain"></i></div>
                <div class="section-title">Security Research</div>
                <div class="section-meta">🔬 RESEARCH</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Vulnerability Research</h3>
                <div class="grid grid-2">
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">📊 CVE Research</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>CVE databases</li>
                            <li>Vendor advisories</li>
                            <li>Patch analysis</li>
                            <li>Exploit validation</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🧪 Methodology</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Recon → Hypothesis</li>
                            <li>Safe validation</li>
                            <li>Evidence collection</li>
                            <li>Impact assessment</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderPracticePage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-green"><i class="fas fa-play"></i></div>
                <div class="section-title">Practice Labs</div>
                <div class="section-meta">🧪 LABS</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Lab Environment</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                    Practice your skills in safe, isolated environments:
                </p>
                <div class="grid grid-2">
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🏴‍☠️ CTF Platforms</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>TryHackMe</li>
                            <li>Hack The Box</li>
                            <li>PortSwigger Labs</li>
                            <li>OverTheWire</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🖥️ Local Labs</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>VulnHub VMs</li>
                            <li>DVWA</li>
                            <li>OWASP Juice Shop</li>
                            <li>Metasploitable</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderReferencePage() {
    return `
        <section class="section">
            <div class="section-header">
                <div class="section-icon icon-cyan"><i class="fas fa-book"></i></div>
                <div class="section-title">Reference</div>
                <div class="section-meta">📚 REFERENCE</div>
            </div>
            <div style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <h3 style="color: var(--accent-green); margin-bottom: 1rem;">Quick Reference</h3>
                <div class="grid grid-2">
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🔗 Resources</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>OWASP Top 10</li>
                            <li>MITRE ATT&CK</li>
                            <li>CWE/SANS</li>
                            <li>NIST Guidelines</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius);">
                        <h4 style="color: var(--text-primary);">🛠️ Tools</h4>
                        <ul style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.8; padding-left: 1.2rem;">
                            <li>Nmap</li>
                            <li>Burp Suite</li>
                            <li>Metasploit</li>
                            <li>BloodHound</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderArsenalPage() {
    const arsenalCategories = [
        { name: 'Reconnaissance', icon: 'fa-search', color: 'cyan', topics: 30, desc: 'Asset discovery, OSINT, attack surface mapping, and technology fingerprinting.' },
        { name: 'Enumeration', icon: 'fa-list', color: 'purple', topics: 30, desc: 'Service enumeration, port scanning, protocol discovery, and application mapping.' },
        { name: 'Web Attacks', icon: 'fa-globe', color: 'red', topics: 30, desc: 'SQL injection, XSS, SSTI, SSRF, XXE, deserialization, and request smuggling.' },
        { name: 'Access & Identity', icon: 'fa-user-lock', color: 'orange', topics: 30, desc: 'Broken access control, IDOR, session management, OAuth, JWT, and MFA.' },
        { name: 'API Security', icon: 'fa-code', color: 'green', topics: 30, desc: 'REST, GraphQL, gRPC, WebSocket, object-level authorization, and mass assignment.' },
        { name: 'Active Directory', icon: 'fa-network-wired', color: 'red', topics: 30, desc: 'Kerberos attacks, LDAP, BloodHound, AD CS, delegation, and lateral movement.' },
        { name: 'Linux Security', icon: 'fa-linux', color: 'orange', topics: 31, desc: 'Privilege escalation, SUID, sudo, cron, capabilities, and container security.' },
        { name: 'Windows Security', icon: 'fa-windows', color: 'cyan', topics: 30, desc: 'Privilege escalation, service permissions, UAC bypass, and credential dumping.' },
        { name: 'Network Security', icon: 'fa-network-wired', color: 'green', topics: 30, desc: 'Port scanning, DNS, segmentation, firewalls, and traffic analysis.' },
        { name: 'Cloud & Containers', icon: 'fa-cloud', color: 'purple', topics: 31, desc: 'IAM, object storage, Kubernetes, Docker, and serverless security.' },
        { name: 'Mobile & IoT', icon: 'fa-mobile-alt', color: 'yellow', topics: 30, desc: 'Android, iOS, firmware, MQTT, and embedded device security.' },
        { name: 'Binary & Vulnerability Research', icon: 'fa-microchip', color: 'red', topics: 31, desc: 'Memory safety, fuzzing, reverse engineering, ASLR, and DEP.' }
    ];

    return `
        <section class="section" id="arsenal">
            <div class="section-header">
                <div class="section-icon icon-purple"><i class="fas fa-sword"></i></div>
                <div class="section-title">⚔️ Arsenal — Red Team Encyclopedia</div>
                <div class="section-meta">KNOWLEDGE BASE</div>
            </div>
            <div style="margin-bottom: 2rem; padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border);">
                <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: 1rem;">
                    Structured offensive security knowledge base covering reconnaissance, enumeration, vulnerability analysis, web attacks, exploitation, Active Directory, and privilege escalation.
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    <span style="padding: 0.25rem 0.75rem; border: 1px solid var(--accent-green); border-radius: 2rem; color: var(--accent-green); font-size: 0.75rem; font-family: var(--font-mono);">Red Team</span>
                    <span style="padding: 0.25rem 0.75rem; border: 1px solid var(--accent-purple); border-radius: 2rem; color: var(--accent-purple); font-size: 0.75rem; font-family: var(--font-mono);">Knowledge Base</span>
                    <span style="padding: 0.25rem 0.75rem; border: 1px solid var(--accent-red); border-radius: 2rem; color: var(--accent-red); font-size: 0.75rem; font-family: var(--font-mono);">AD Security</span>
                    <span style="padding: 0.25rem 0.75rem; border: 1px solid var(--accent-orange); border-radius: 2rem; color: var(--accent-orange); font-size: 0.75rem; font-family: var(--font-mono);">Privilege Escalation</span>
                </div>
            </div>
            <div class="grid grid-2">
                ${arsenalCategories.map(cat => `
                    <div class="card resource-card" style="border-left: 3px solid var(--accent-${cat.color});">
                        <div class="card-title" style="font-size: 0.9rem; display: flex; align-items: center; gap: 10px;">
                            <i class="fas ${cat.icon}" style="color: var(--accent-${cat.color});"></i>
                            <span style="flex: 1;">${cat.name}</span>
                            <span style="font-family: var(--font-mono); font-size: 0.55rem; color: var(--text-muted); background: var(--bg-secondary); padding: 0.1rem 0.5rem; border-radius: 2rem;">
                                ${cat.topics}
                            </span>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.3rem;">
                            ${cat.desc}
                        </p>
                        <a href="#" style="color: var(--accent-${cat.color}); text-decoration: none; font-size: 0.7rem; font-weight: 600; display: inline-block; margin-top: 0.3rem;">
                            Open → <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 1.5rem; padding: 1rem; border: 1px solid var(--border); border-radius: var(--radius); background: rgba(168, 85, 247, 0.04); text-align: center;">
                <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">
                    <i class="fas fa-info-circle" style="color: var(--accent-purple);"></i>
                    ${arsenalCategories.reduce((acc, cat) => acc + cat.topics, 0)} total topics across ${arsenalCategories.length} categories
                </p>
            </div>
        </section>
    `;
}

function getLink(name) {
    const links = {
        'PortSwigger Web Security Academy': 'https://portswigger.net/web-security',
        'OWASP WSTG': 'https://owasp.org/www-project-web-security-testing-guide/',
        'OWASP ASVS': 'https://owasp.org/www-project-application-security-verification-standard/',
        'OWASP Juice Shop': 'https://owasp.org/www-project-juice-shop/',
        'DVWA': 'https://github.com/digininja/DVWA',
        'OverTheWire': 'https://overthewire.org/wargames/',
        'VulnHub': 'https://www.vulnhub.com/',
        'Metasploitable': 'https://sourceforge.net/projects/metasploitable/',
        'MITRE ATT&CK': 'https://attack.mitre.org/',
        'NVD / CVE': 'https://nvd.nist.gov/',
        'Microsoft Learn': 'https://learn.microsoft.com/',
        'OpenSSH documentation': 'https://www.openssh.com/manual.html',
        'BloodHound documentation': 'https://bloodhound.readthedocs.io/',
        'Atomic Red Team': 'https://atomicredteam.io/',
        'DetectionLab': 'https://www.detectionlab.network/',
        'TryHackMe free rooms': 'https://tryhackme.com/',
        'Hack The Box Starting Point': 'https://www.hackthebox.com/',
        'HackIndex io': 'https://hackindex.io/platforms',
        'Arsenal — Red Team Encyclopedia': 'https://npx-official.github.io/projects/arsenal',
    };
    return links[name] || '#';
}

function getYoutubeLink(name) {
    const links = {
        'John Hammond': 'https://www.youtube.com/c/JohnHammond010',
        'IppSec': 'https://www.youtube.com/c/ippsec',
        'LiveOverflow': 'https://www.youtube.com/c/LiveOverflow',
        'The Cyber Mentor': 'https://www.youtube.com/c/TheCyberMentor',
        '13Cubed': 'https://www.youtube.com/c/13Cubed',
        'NahamSec': 'https://www.youtube.com/c/NahamSec',
        'STÖK': 'https://www.youtube.com/c/STOKfredrik',
        'PortSwigger': 'https://www.youtube.com/c/PortSwigger',
        'David Bombal': 'https://www.youtube.com/c/DavidBombal',
        'NetworkChuck': 'https://www.youtube.com/c/NetworkChuck'
    };
    return links[name] || '#';
}

const FREE_SOURCES = {
    freeCommunity: [
        'Arsenal — Red Team Encyclopedia','HackIndex io' ,'PortSwigger Web Security Academy', 'OWASP WSTG', 
        'OWASP ASVS', 'OWASP Juice Shop',
        'DVWA', 'OverTheWire', 'VulnHub', 'Metasploitable', 'MITRE ATT&CK', 'NVD / CVE',
        'Microsoft Learn', 'OpenSSH documentation', 'BloodHound documentation', 'Atomic Red Team',
        'DetectionLab', 'TryHackMe free rooms', 'Hack The Box Starting Point' , 'Arsenal — Red Team Encyclopedia',
    ],
    youtube: [
        'John Hammond', 'IppSec', 'LiveOverflow', 'The Cyber Mentor',
        '13Cubed', 'NahamSec', 'STÖK', 'PortSwigger', 'David Bombal', 'NetworkChuck'
    ]
};

function renderFreeLearningStack() {
    return `
        <section class="section" id="free-learning-stack">
            <div class="section-header">
                <div class="section-icon icon-green"><i class="fas fa-graduation-cap"></i></div>
                <div class="section-title">FREE LEARNING STACK</div>
                <div class="section-meta">📚 STUDY WITHOUT PAID COURSE ACCESS</div>
            </div>
            <div class="description-box">
                <p>🌟 Click any resource below to visit the official website. All resources are completely free!</p>
            </div>
            <div class="category-header">
                <i class="fas fa-users" style="color: var(--accent-green);"></i>
                <span style="color: var(--text-primary); font-weight: 600;">FREE / COMMUNITY</span>
                <span class="category-line"></span>
                <span class="category-badge badge-green">${FREE_SOURCES.freeCommunity.length} resources</span>
            </div>
            <div class="grid grid-2">
                ${FREE_SOURCES.freeCommunity.map(source => `
                    <div class="card resource-card" style="border-left: 3px solid var(--accent-green);">
                        <div class="card-title" style="font-size: 0.9rem;">
                            <i class="fas fa-book" style="color: var(--accent-green);"></i>
                            <a href="${getLink(source)}" target="_blank" rel="noopener noreferrer">
                                ${source}
                            </a>
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.5rem;">
                            🔗 Click to visit
                        </p>
                    </div>
                `).join('')}
            </div>
            <div class="category-header">
                <i class="fab fa-youtube" style="color: #ff0000;"></i>
                <span style="color: var(--text-primary); font-weight: 600;">YouTube Channels</span>
                <span class="category-line"></span>
                <span class="category-badge badge-orange">${FREE_SOURCES.youtube.length} channels</span>
            </div>
            <div class="grid grid-2">
                ${FREE_SOURCES.youtube.map(source => `
                    <div class="card resource-card" style="border-left: 3px solid var(--accent-orange);">
                        <div class="card-title" style="font-size: 0.9rem;">
                            <i class="fab fa-youtube" style="color: #ff0000;"></i>
                            <a href="${getYoutubeLink(source)}" target="_blank" rel="noopener noreferrer">
                                ${source}
                            </a>
                            <i class="fas fa-external-link-alt"></i>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.5rem;">
                            🎥 Click to visit channel
                        </p>
                    </div>
                `).join('')}
            </div>
            <div class="footer-note">
                <p>
                    <i class="fas fa-info-circle"></i>
                    All resources are free to access. Click any name to visit the official website.
                </p>
            </div>
        </section>
    `;
}

// ============================================================
// 🧩 COMPONENTS
// ============================================================

function renderHeader() {
    return `
        <header class="app-header">
            <div class="header-inner">
                <a href="#top" class="logo">
                    <span class="logo-dot"></span>
                    <span class="logo-text">NIGHT PULSE X</span>
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

function renderHero() {
    return `
        <section class="hero-section">
            <div class="hero-glow"></div>
            <div class="hero-content">
                <h1 class="hero-title">
                    Learn the skill<br />
                    <span class="hero-highlight">Prove the skill.</span>
                </h1>
                <p class="hero-description">A free platform bringing together a structured curriculum, local labs, a Field Manual, notes, and a final review. It doesn't rely on paid content, and you don't need any external links to start studying.</p>
                <div class="hero-actions">
                    <a href="#curriculum" class="btn-primary">CONTINUE ACADEMY <i class="fas fa-arrow-right"></i></a>
                    <a href="#lab" class="btn-secondary"><i class="fas fa-terminal"></i> OPEN LAB 01</a>
                </div>
                <div class="hero-stats">
                    <div class="stat-item"><span class="stat-number">13</span><span class="stat-label">Weeks</span></div>
                    <div class="stat-item"><span class="stat-number">100+</span><span class="stat-label">Labs planned</span></div>
                    <div class="stat-item"><span class="stat-number">06</span><span class="stat-label">Core tracks</span></div>
                    <div class="stat-item"><span class="stat-number accent">${APP_CONFIG.progress}%</span><span class="stat-label">Your coverage</span></div>
                </div>
            </div>
        </section>
    `;
}

function renderSidebar() {
    return `
        <aside class="app-sidebar" id="app-sidebar">
            <div class="sidebar-learning">
                <div class="learning-header"><i class="fas fa-activity"></i><span>Learning system</span></div>
                <div class="learning-title">Academy / 01</div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${APP_CONFIG.progress}%"></div></div>
                <div class="progress-labels"><span>${APP_CONFIG.progress}% complete</span><span>${APP_CONFIG.skillsDone} / ${APP_CONFIG.skillsTotal} skills</span></div>
            </div>
            <div class="sidebar-nav">
                <div class="nav-title">Explore</div>
                ${NAV_ITEMS.map(([label, panel, icon]) => `
                    <a href="#" class="nav-link ${state.activePanel === panel ? 'active' : ''}" 
                       data-panel="${panel}" 
                       onclick="window.handleNavigate && window.handleNavigate('${panel}'); return false;">
                        <i class="fas ${icon}"></i><span>${label}</span>
                        ${['WEB / API', 'ACTIVE DIRECTORY'].includes(label) ? '<i class="fas fa-chevron-right"></i>' : ''}
                    </a>
                `).join('')}
            </div>
            <div style="margin-top: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.75rem;">
                <a href="#" class="nav-link ${state.activePanel === 'Arsenal' ? 'active' : ''}" 
                   data-panel="Arsenal"
                   onclick="window.handleNavigate && window.handleNavigate('Arsenal'); return false;"
                   style="font-weight: 600; color: var(--accent-purple);">
                    <i class="fas fa-sword"></i>
                    <span>⚔️ ARSENAL</span>
                    <i class="fas fa-chevron-right" style="margin-left: auto; font-size: 0.625rem;"></i>
                </a>
            </div>
            <div style="margin-top: 0.5rem; border-top: 1px solid var(--border); padding-top: 0.75rem;">
                <a href="#" class="nav-link ${state.activePanel === 'Free Learning Stack' ? 'active' : ''}" 
                   data-panel="Free Learning Stack"
                   onclick="window.handleNavigate && window.handleNavigate('Free Learning Stack'); return false;"
                   style="font-weight: 600; color: var(--accent-green);">
                    <i class="fas fa-graduation-cap"></i>
                    <span>FREE LEARNING STACK</span>
                    <i class="fas fa-chevron-right" style="margin-left: auto; font-size: 0.625rem;"></i>
                </a>
            </div>
            <div class="sidebar-stats">
                <div class="stat-box"><span class="stat-label">LABS</span><span class="stat-value">${APP_CONFIG.labsCount}</span></div>
                <div class="stat-box"><span class="stat-label">STREAK</span><span class="stat-value accent">${APP_CONFIG.streak}</span></div>
            </div>
        </aside>
    `;
}

function renderTracks() {
    return `
        <section class="tracks-section" id="academy">
            <div class="section-header">
                <div><span class="section-eyebrow">01 / ACADEMY</span><h2>Choose your attack surface</h2></div>
                <span class="section-meta">MEGA NAVIGATION</span>
            </div>
            <div class="tracks-grid">
                ${TRACKS.map(track => {
                    const isOpen = state.openTrack === track.code;
                    return `
                        <div class="track-card ${isOpen ? 'active' : ''}" data-track="${track.code}">
                            <button class="track-toggle" data-track="${track.code}">
                                <div class="track-icon icon-${track.color}"><i class="fas ${track.icon}"></i></div>
                                <div class="track-info">
                                    <div class="track-header"><span class="track-name">${track.name}</span><span class="track-code">${track.code}</span></div>
                                    <p class="track-desc">${track.description}</p>
                                </div>
                                <i class="fas fa-chevron-down track-arrow"></i>
                            </button>
                            <div class="track-content ${isOpen ? 'active' : ''}" data-track="${track.code}">
                                <div class="track-lessons">
                                    ${track.lessons.map((lesson, index) => `
                                        <a href="#" class="lesson-link" data-lesson="${lesson}">
                                            <span class="lesson-number">${String(index + 1).padStart(2, '0')}</span>${lesson}
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

function renderCurriculum() {
    const week = findWeek(WEEKS, state.selectedWeek);
    return `
        <section class="curriculum-section" id="curriculum">
            <div class="curriculum-grid">
                <div>
                    <div class="section-header">
                        <div><span class="section-eyebrow">02 / FULL CURRICULUM</span><h2>13 weeks + final readiness</h2></div>
                        <span class="section-meta">264H TOTAL</span>
                    </div>
                    <div class="weeks-list">
                        ${WEEKS.map(([number, title, hours, desc]) => `
                            <button class="week-btn ${state.selectedWeek === number ? 'active' : ''}" data-week="${number}">
                                <span class="week-number">W${number}</span>
                                <div class="week-info"><span class="week-title">${title}</span><span class="week-desc">${desc}</span></div>
                                <span class="week-hours">${hours}</span><i class="fas fa-chevron-right"></i>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="selected-module">
                    <div class="module-header"><span>Selected module</span><span>W${state.selectedWeek}</span></div>
                    <h3 id="selected-week-title">${week ? week[1] : ''}</h3>
                    <p id="selected-week-desc">${week ? week[3] : ''}. Every module connects theory to a scoped lab, evidence collection and a reporting checkpoint.</p>
                    <div class="module-checklist">
                        <div><i class="fas fa-check-circle"></i> Concept briefing</div>
                        <div><i class="fas fa-check-circle"></i> Guided practice lab</div>
                        <div><i class="fas fa-check-circle"></i> Evidence + finding review</div>
                        <div><i class="far fa-circle"></i> Readiness checkpoint</div>
                    </div>
                    <button class="btn-module" data-week="${state.selectedWeek}">OPEN WEEK ${state.selectedWeek} <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
        </section>
    `;
}

function renderLabs() {
    return `
        <section class="labs-section" id="lab">
            <div class="section-header">
                <div><span class="section-eyebrow">05 / PRACTICE ENVIRONMENT</span><h2>Lab 01 — exposed configuration</h2></div>
                <span class="section-meta">SAFE BROWSER SIMULATION</span>
            </div>
            <div class="lab-grid">
                <div class="lab-target">
                    <div class="target-card">
                        <div class="target-header"><i class="fas fa-server"></i><span>TARGET</span></div>
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
                    <div class="evidence-board">
                        <div class="evidence-header"><i class="fas fa-clipboard-list"></i><span>EVIDENCE BOARD</span></div>
                        <div class="evidence-items">
                            ${['Open Port', 'HTTP Header', 'User', 'Endpoint', 'File', 'Configuration'].map(item => `
                                <button class="evidence-tag ${state.evidence.includes(item) ? 'active' : ''}" data-item="${item}">
                                    ${state.evidence.includes(item) ? '[+] ' : '[ ] '}${item}
                                </button>
                            `).join('')}
                        </div>
                        <div class="evidence-footer">
                            <span>Observation → <strong>Evidence</strong> → Finding → Impact</span>
                            <span class="evidence-count">${state.evidence.length} evidence items captured</span>
                        </div>
                    </div>
                </div>
                <div class="terminal-container">
                    <div class="terminal-header"><i class="fas fa-terminal"></i><span>student@npx-lab:~$</span><span class="terminal-lab">recon-lab-01 / simulated</span></div>
                    <div class="terminal-body" id="terminal-output">
                        ${state.terminalLines.map(line => `
                            <div class="${line.startsWith('student@') ? 'terminal-line' : 'terminal-output'}">${line}</div>
                        `).join('')}
                    </div>
                    <div class="terminal-input">
                        <span>student@npx-lab:~$</span>
                        <input type="text" id="command-input" placeholder="try: ls" />
                    </div>
                    <div class="terminal-footer">Tab autocomplete · history enabled · filesystem changes are scoped to this lab</div>
                </div>
            </div>
            <div class="link-cards">
                ${[
                    { icon: 'fa-file-alt', title: 'Report Builder', text: 'Turn evidence into a professional finding, impact and remediation.' },
                    { icon: 'fa-radar', title: 'CVE Research Desk', text: 'Read disclosures, match versions and document responsible reproduction.' },
                    { icon: 'fa-database', title: 'Knowledge Base', text: 'Concepts, commands, checklists and connected lab practice.' }
                ].map(card => `
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

function renderAssessment() {
    return `
        <section class="grid gap-8 py-12 lg:grid-cols-[1fr_1fr]" id="progress">
            <div>
                <div class="section-header">
                    <div><span class="section-eyebrow">03 / COVERAGE INDEX</span><h2>Know where you stand</h2></div>
                    <span class="section-meta">LIVE PROFILE</span>
                </div>
                <div class="rounded-lg border border-border bg-card p-5">
                    ${[
                        ['HTTP', 82], ['API', 68], ['Authentication', 74], ['SQL Injection', 51],
                        ['SSRF', 38], ['Linux', 64], ['Windows', 47], ['Active Directory', 28],
                        ['Cloud', 16], ['Research', 12]
                    ].map(([label, value]) => `
                        <div class="coverage-item">
                            <div class="coverage-header"><span>${label}</span><span class="coverage-value">${value}%</span></div>
                            <div class="progress-bar-sm"><div class="progress-fill-sm ${value > 60 ? 'primary' : value > 30 ? 'accent' : 'destructive'}" style="width: ${value}%"></div></div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div>
                <div class="section-header">
                    <div><span class="section-eyebrow">04 / READINESS</span><h2>Assessment console</h2></div>
                    <span class="section-meta">PRACTITIONER PATH</span>
                </div>
                <div class="rounded-lg border border-border bg-card p-5">
                    <div class="assessment-score">
                        <div class="score-circle">78%</div>
                        <div><div class="score-title">PRACTITIONER</div><div class="score-subtitle">4 checkpoints ready for review</div></div>
                    </div>
                    ${['Recon Challenge', 'Web Challenge', 'Linux Challenge', 'Reporting Challenge'].map((item, index) => `
                        <div class="challenge-item">
                            <span class="challenge-dot ${index < 3 ? 'pass' : 'review'}"></span>${item}
                            <span class="challenge-status">${index < 3 ? 'PASS' : 'REVIEW'}</span>
                        </div>
                    `).join('')}
                    <button class="btn-assessment" id="assessment-toggle">${state.assessmentStarted ? 'ASSESSMENT ACTIVE' : 'START READINESS REVIEW'} <i class="fas fa-play"></i></button>
                </div>
            </div>
        </section>
    `;
}

function renderFooter() {
    return `<footer class="site-footer">NIGHT PULSE X / Authorized learning only / Build skill. Keep scope.</footer>`;
}

// ============================================================
// 🧩 RENDER APP
// ============================================================

function renderApp() {
    const root = document.getElementById('root');
    if (!root) {
        console.error('❌ #root not found!');
        return;
    }
    
    let mainContent;
    
    switch(state.activePanel) {
        case 'Academy':
            mainContent = `
                ${renderHero()}
                ${renderTracks()}
                ${renderCurriculum()}
                ${renderAssessment()}
                ${renderLabs()}
            `;
            break;
        case 'Methodology':
            mainContent = renderMethodologyPage();
            break;
        case 'Web / API':
            mainContent = renderTracks();
            break;
        case 'Network':
            mainContent = renderNetworkPage();
            break;
        case 'Linux':
            mainContent = renderLinuxPage();
            break;
        case 'Windows':
            mainContent = renderWindowsPage();
            break;
        case 'Active Directory':
            mainContent = renderADPage();
            break;
        case 'Cloud':
            mainContent = renderCloudPage();
            break;
        case 'Research':
            mainContent = renderResearchPage();
            break;
        case 'Practice':
            mainContent = renderPracticePage();
            break;
        case 'Arsenal':
            mainContent = renderArsenalPage();
            break;
        case 'Reference':
            mainContent = renderReferencePage();
            break;
        case 'Free Learning Stack':
            mainContent = renderFreeLearningStack();
            break;
        default:
            mainContent = `
                ${renderHero()}
                ${renderTracks()}
                ${renderCurriculum()}
                ${renderAssessment()}
                ${renderLabs()}
            `;
    }
    
    root.innerHTML = `
        ${renderHeader()}
        <div class="main-content">
            <div class="container">
                <div class="app-layout">
                    ${renderSidebar()}
                    <main class="app-main">
                        ${mainContent}
                        ${renderFooter()}
                    </main>
                </div>
            </div>
        </div>
        <button class="mobile-sidebar-toggle" id="mobile-sidebar-toggle">
            <i class="fas fa-bars"></i>
        </button>
    `;
    
    attachEventListeners();
}

// ============================================================
// 🔗 ATTACH EVENT LISTENERS
// ============================================================

function attachEventListeners() {
    document.querySelectorAll('.track-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const track = this.dataset.track;
            if (track) handleTrackToggle(track);
        });
    });
    
    document.querySelectorAll('.week-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const week = this.dataset.week;
            if (week) handleWeekSelect(week);
        });
    });
    
    document.querySelectorAll('.evidence-tag').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.dataset.item;
            if (item) handleEvidenceToggle(item);
        });
    });
    
    const assessmentBtn = document.getElementById('assessment-toggle');
    if (assessmentBtn) {
        assessmentBtn.addEventListener('click', handleAssessmentToggle);
    }
    
    const commandInput = document.getElementById('command-input');
    if (commandInput) {
        commandInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const cmd = this.value.trim();
                if (cmd) {
                    handleTerminalCommand(cmd);
                    this.value = '';
                }
            }
        });
    }
    
    const mobileToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.getElementById('app-sidebar');
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    document.querySelectorAll('.btn-module').forEach(btn => {
        btn.addEventListener('click', function() {
            alert(`Opening Week ${this.dataset.week} module...`);
        });
    });
}

// ============================================================
// 🚀 INIT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ NIGHT PULSE X starting...');
    renderApp();
    console.log('✅ App ready!');
});

window.renderApp = renderApp;
window.handleTrackToggle = handleTrackToggle;
window.handleWeekSelect = handleWeekSelect;
window.handleEvidenceToggle = handleEvidenceToggle;
window.handleAssessmentToggle = handleAssessmentToggle;
window.handleTerminalCommand = handleTerminalCommand;