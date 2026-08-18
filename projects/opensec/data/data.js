// ============================================================
// 📦 ALL DATA — NIGHT PULSE X
// ============================================================

export const APP_CONFIG = {
    appName: 'NIGHT PULSE X',
    version: 'v1.3.0',
    weeksLabel: '13 WEEKS',
    labsCount: 24,
    streak: '07d',
    progress: 42,
    skillsTotal: 43,
    skillsDone: 18,
    assessmentScore: 78,
    assessmentStatus: 'PRACTITIONER',
    checkpointsReady: 4,
};

export const NAV_ITEMS = [
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

export const TRACKS = [
    { name: 'Core Pentest', code: 'CORE', icon: 'fa-bullseye', color: 'green', description: 'The methodology that turns scattered tools into a repeatable assessment.', lessons: ['Methodology', 'Reconnaissance', 'Enumeration', 'Vulnerability Analysis', 'Exploitation', 'Post Exploitation', 'Reporting'] },
    { name: 'Web / API', code: 'WEB', icon: 'fa-globe', color: 'cyan', description: 'Map requests, sessions and trust boundaries before validating findings.', lessons: ['HTTP', 'Authentication', 'Access Control', 'SQL Injection', 'XSS', 'SSRF', 'API Security', 'Business Logic'] },
    { name: 'Windows / AD', code: 'AD', icon: 'fa-network-wired', color: 'red', description: 'Understand identity, permissions, trust and movement in enterprise labs.', lessons: ['Windows Fundamentals', 'AD Enumeration', 'LDAP', 'Kerberos', 'SMB', 'Delegation', 'ACLs', 'Lateral Movement'] },
    { name: 'Privilege Escalation', code: 'PRIV', icon: 'fa-shield', color: 'orange', description: 'Build situational awareness and find misconfigurations methodically.', lessons: ['Linux Permissions', 'SUID & Capabilities', 'Sudo', 'Services', 'Windows Services', 'Scheduled Tasks', 'PowerShell'] },
    { name: 'Cloud / Containers', code: 'CLOUD', icon: 'fa-layer-group', color: 'purple', description: 'Follow access paths through IAM, metadata, Docker and Kubernetes.', lessons: ['IAM', 'Storage', 'Metadata', 'Docker', 'Kubernetes'] },
    { name: 'Security Research', code: 'RESEARCH', icon: 'fa-brain', color: 'yellow', description: 'Analyze disclosures, source, dependencies and patches responsibly.', lessons: ['CVE Analysis', 'Source Review', 'Dependency Analysis', 'Patch Analysis', 'Responsible PoC Research'] }
];

export const WEEKS = [
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

export const COMMAND_OUTPUTS = {
    'pwd': '/home/student',
    'ls': 'drwxr-xr-x  www\ndrwxr-xr-x  evidence\n-rw-r--r--  notes.txt',
    'cd /var/www': 'npx@lab:/var/www$',
    'cat config.php': "<?php\n$db_host = 'localhost';\n$db_user = 'app_reader';\n$db_pass = 'training_only';",
};

export const FREE_SOURCES = {
    freeCommunity: [
        'PortSwigger Web Security Academy',
        'OWASP WSTG',
        'OWASP ASVS',
        'OWASP Juice Shop',
        'DVWA',
        'OverTheWire',
        'VulnHub',
        'Metasploitable',
        'MITRE ATT&CK',
        'NVD / CVE',
        'Microsoft Learn',
        'OpenSSH documentation',
        'BloodHound documentation',
        'Atomic Red Team',
        'DetectionLab',
        'TryHackMe free rooms',
        'Hack The Box Starting Point'
    ],
    youtube: [
        'John Hammond',
        'IppSec',
        'LiveOverflow',
        'The Cyber Mentor',
        '13Cubed',
        'NahamSec',
        'STÖK',
        'PortSwigger',
        'David Bombal',
        'NetworkChuck'
    ]
};
