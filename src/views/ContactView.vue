<template>
  <h1 class="page-title"><i class="fas fa-envelope"></i> Connect With Me</h1>

  <div class="social-grid">
    <a href="https://github.com/npx-official" target="_blank" class="social-card">
      <i class="fab fa-github"></i>
      <h4>GitHub</h4>
    </a>
    <a href="https://app.hackthebox.com/users/2207141" target="_blank" class="social-card">
      <i class="fas fa-shield-halved"></i>
      <h4>Hack The Box</h4>
    </a>
    <a href="https://tryhackme.com/p/npx.off" target="_blank" class="social-card">
      <i class="fas fa-user-secret"></i>
      <h4>TryHackMe</h4>
    </a>
    <a href="https://www.linkedin.com/in/night-pulse-x-337a89275" target="_blank" class="social-card">
      <i class="fab fa-linkedin"></i>
      <h4>LinkedIn</h4>
    </a>
    <a href="https://discord.com/users/npx.official" target="_blank" class="social-card">
      <i class="fab fa-discord"></i>
      <h4>Discord</h4>
    </a>
  </div>
</template>

<style scoped>
.social-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; max-width: 800px; margin: 0 auto; }
.social-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(111, 255, 224, 0.06); border-radius: 1.5rem; padding: 2rem 1.5rem; text-align: center; transition: 0.3s; text-decoration: none; color: #b6c8e0; display: block; }
.social-card:hover { transform: translateY(-6px); border-color: #6fffe0; }
.social-card i { font-size: 2.5rem; color: #6fffe0; margin-bottom: 0.8rem; display: block; }
.social-card h4 { color: #e0e5f0; font-size: 1.1rem; margin-bottom: 0.3rem; }
.social-card p { color: rgba(255,255,255,0.4); font-size: 0.85rem; }
.page-title { font-size: 2.8rem; font-weight: 700; text-align: center; margin-bottom: 2.5rem; background: linear-gradient(135deg, #6fffe0, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; justify-content: center; gap: 15px; }
</style>
