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
        statusHTML = `<span style="background: rgba(168, 224, 110, 0.12); color: #a8e06e; font-size: 0.6rem; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(168, 224, 110, 0.15); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">● Live</span>`;
    } else if (project.status === 'coming') {
        statusHTML = `<span style="background: rgba(234, 197, 98, 0.12); color: #eac562; font-size: 0.6rem; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(234, 197, 98, 0.15); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">● Coming Soon</span>`;
    }
    
    card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem;">
            <div class="project-icon" style="font-size: 2.5rem; display: inline-block; transition: transform 0.4s ease;">${project.icon}</div>
            ${statusHTML}
        </div>
        <h4 style="color: #f0f4ff; font-size: 1.1rem; margin-bottom: 0.5rem; font-weight: 600; word-break: keep-all; white-space: nowrap;">${project.name}</h4>
        <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.8rem; flex: 1;">${project.desc}</p>
        <div class="project-tags" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem;">
            ${project.tags.map(t => `<span style="font-size: 0.6rem; padding: 0.2rem 0.8rem; border-radius: 20px; background: rgba(111, 255, 224, 0.08); border: 1px solid rgba(111, 255, 224, 0.08); color: rgba(255,255,255,0.5); text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">${t}</span>`).join('')}
        </div>
        <a href="${project.link}" class="project-link" style="color: #6fffe0; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: 0.3s; font-size: 0.9rem; margin-top: auto; align-self: flex-start;">
            View Project <i class="fas fa-arrow-right" style="transition: 0.3s;"></i>
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
