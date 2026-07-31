<template>
  <div class="about-page">
    <h1 class="page-title"><i class="fas fa-user-astronaut"></i> About Me</h1>

    <div class="bio-text">
      <span class="emoji-big">🦊</span>
      <p>Passionate <strong>Offensive Security Enthusiast</strong> | CTF Player | Bug Bounty Hunter</p>
      <p>Currently focused on <strong>OSCP Preparation</strong> &amp; HTB Machines</p>
    </div>

    <div class="about-grid">
      <div class="about-card">
        <span class="emoji">🦊</span>
        <h3>Who Am I?</h3>
        <ul>
          <li><span class="icon">🔐</span> <strong>Offensive Security Enthusiast</strong></li>
          <li><span class="icon">🎯</span> Currently: <strong>OSCP Preparation</strong> &amp; HTB Machines</li>
        </ul>
      </div>
      <div class="about-card">
        <span class="emoji">📚</span>
        <h3>Learning</h3>
        <ul>
          <li><span class="icon">🌐</span> Web Application Security</li>
          <li><span class="icon">🏰</span> Active Directory Pentesting</li>
          <li><span class="icon">☁️</span> Cloud Security</li>
        </ul>
      </div>
      <div class="about-card">
        <span class="emoji">⚡</span>
        <h3>Tech Stack</h3>
        <div class="tech-grid">
          <span class="tech-tag">🐍 Python</span>
          <span class="tech-tag">💻 Bash</span>
          <span class="tech-tag">📜 JavaScript</span>
          <span class="tech-tag">🐧 Linux</span>
          <span class="tech-tag">🪟 Windows</span>
          <span class="tech-tag">🛡️ Metasploit</span>
          <span class="tech-tag">🐛 Burp Suite</span>
          <span class="tech-tag">🐳 Docker</span>
          <span class="tech-tag">🔧 Git</span>
        </div>
      </div>
      <div class="about-card">
        <span class="emoji">🏆</span>
        <h3>Achievements</h3>
        <ul>
          <li><span class="icon">📝</span> <strong>Paperwork</strong> — Complete machine walkthrough</li>
          <li><span class="icon">🛠️</span> <strong>Custom Exploit Scripts</strong> — Collection of exploits</li>
          <li><span class="icon">📚</span> <strong>Cybersecurity Content</strong> — Technical articles</li>
        </ul>
      </div>
      <div class="about-card">
        <span class="emoji">🎯</span>
        <h3>Goals</h3>
        <ul>
          <li><span class="icon">✅</span> Complete <strong>OSCP</strong> certification</li>
          <li><span class="icon">✅</span> Build <strong>50+</strong> HTB writeups</li>
          <li><span class="icon">✅</span> Contribute to <strong>open-source</strong> security tools</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 3rem; max-width: 800px; margin: 0 auto; }
.about-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(111, 255, 224, 0.06); border-radius: 1.5rem; padding: 2rem; text-align: center; transition: 0.4s; }
.about-card:hover { transform: translateY(-8px); border-color: #6fffe0; }
.about-card .emoji { font-size: 2.5rem; display: block; margin-bottom: 0.8rem; }
.about-card h3 { color: #6fffe0; font-size: 1.4rem; margin-bottom: 1rem; }
.about-card ul { list-style: none; padding: 0; }
.about-card ul li { padding: 0.3rem 0; display: flex; align-items: center; justify-content: center; gap: 10px; }
.about-card ul li .icon { color: #6fffe0; font-size: 1rem; }
.tech-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-top: 0.5rem; }
.tech-tag { padding: 0.4rem 1.2rem; border-radius: 30px; background: rgba(0, 255, 200, 0.04); border: 1px solid rgba(0, 255, 200, 0.08); color: #b6c8e0; font-size: 0.85rem; }
.tech-tag:hover { background: rgba(0, 255, 200, 0.12); border-color: #6fffe0; color: #fff; }
.emoji-big { font-size: 3.5rem; display: block; margin-bottom: 0.5rem; }
.bio-text { max-width: 700px; margin: 0 auto 2rem; text-align: center; color: #b6c8e0; font-size: 1.1rem; line-height: 1.8; }
.bio-text strong { color: #6fffe0; }
.page-title { font-size: 2.8rem; font-weight: 700; text-align: center; margin-bottom: 2.5rem; background: linear-gradient(135deg, #6fffe0, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; justify-content: center; gap: 15px; }
</style>
