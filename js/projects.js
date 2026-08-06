const projectsData = [
    {
        name: 'NPX Framework — Pentesting Automation Suite',
        desc: 'Modular Python framework for automating penetration testing workflows. Includes modules for reconnaissance, exploitation, and reporting.',
        icon: '🛠️',
        category: 'Framework',
        tags: ['Python', 'Automation', 'Pentesting', 'Recon', 'Exploitation'],
        link: 'https://github.com/npx-official/npx-framework'
    },
    {
        name: 'Bug Bounty Learning Path',
        desc: 'A structured roadmap for bug bounty beginners covering methodology, reconnaissance, vulnerability identification, and reporting.',
        icon: '🎯',
        category: 'web',
        tags: ['Bug Bounty', 'Learning', 'Roadmap', 'Web Security'],
        link: '/projects/Bug Bounty Learning Path',
        status: 'live'
    },
    {
        name: 'Custom Exploit Scripts',
        desc: 'Collection of custom exploit scripts for various CVEs and common vulnerabilities found in CTF challenges and real-world penetration tests.',
        icon: '⚡',
        category: 'exploit',
        tags: ['Exploit', 'CVE', 'Python', 'Security'],
        link: '#',
        status: 'coming'
    },
    {
        name: 'Security Research Blog',
        desc: 'Technical articles, research findings, and writeups covering Active Directory security, cloud penetration testing, and advanced attack techniques.',
        icon: '📖',
        category: 'web',
        tags: ['Blog', 'Research', 'AD Security', 'Cloud Security'],
        link: '#',
        status: 'coming'
    },
    {
        name: 'CloudScout — AWS Security Auditing Tool',
        desc: 'CLI tool that scans AWS environments for security misconfigurations including public S3 buckets, IAM users without MFA, and open security groups.',
        icon: '☁️',
        category: 'cloud',
        tags: ['AWS', 'Security', 'Auditing', 'Python', 'Cloud'],
        link: 'https://github.com/npx-official/cloudscout',
        status: 'live'
    }
];

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    let statusHTML = '';
    if (project.status === 'live') {
        statusHTML = `<span style="color:#a8e06e;font-size:0.8rem;">🟢 Live</span>`;
    } else if (project.status === 'coming') {
        statusHTML = `<span style="color:#eac562;font-size:0.8rem;">🟡 Coming Soon</span>`;
    }
    
    card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;">
            <div class="project-icon">${project.icon}</div>
            ${statusHTML}
        </div>
        <h4>${project.name}</h4>
        <p>${project.desc}</p>
        <div class="project-tags">
            ${project.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
        <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
            View Project <i class="fas fa-arrow-right"></i>
        </a>
    `;
    return card;
}

function loadProjects(limit = 0) {
    const container = document.getElementById('projectsGrid');
    if (!container) return;
    
    let displayProjects = [...projectsData];
    if (limit > 0) {
        displayProjects = displayProjects.slice(0, limit);
    }
    
    container.innerHTML = '';
    displayProjects.forEach(project => container.appendChild(createProjectCard(project)));
}

window.loadProjects = loadProjects;
