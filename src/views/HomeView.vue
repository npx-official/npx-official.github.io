<script setup>
import { onMounted, ref } from 'vue'
import { writeupsData } from '../data/writeupsData'

const featured = ref([])

onMounted(() => {
  featured.value = writeupsData.filter(w => 
    w.level === 'hard' || w.level === 'prolabs' || w.os === 'prolabs'
  ).sort((a, b) => {
    if (a.os === 'prolabs' && b.os !== 'prolabs') return -1
    if (a.os !== 'prolabs' && b.os === 'prolabs') return 1
    return a.name.localeCompare(b.name)
  })
})

function getCategoryInfo(category) {
    const mapping = {
        'linux/easy': { label: '🐧 Linux Easy', icon: '🟢' },
        'linux/medium': { label: '🐧 Linux Medium', icon: '🟡' },
        'linux/hard': { label: '🐧 Linux Hard', icon: '🔴' },
        'windows/hard': { label: '🪟 Windows Hard', icon: '🔴' },
        'windows/medium': { label: '🪟 Windows Medium', icon: '🟡' },
        'windows/insane': { label: '🪟 Windows Insane', icon: '💀' },
        'prolabs': { label: '🏆 ProLabs', icon: '⭐' },
        'hacker101/ctf': { label: '🛡️ Hacker101 CTF', icon: '🛡️' },
    };
    return mapping[category] || { label: category, icon: '📄' };
}

function copyPassword(password, event) {
    const btn = event.currentTarget;
    const originalHTML = btn.innerHTML;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(password).then(() => {
            btn.innerHTML = '<i class="fas fa-check" style="color: #00ff88;"></i>';
            setTimeout(() => { btn.innerHTML = originalHTML; }, 1500);
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.innerHTML = '<i class="fas fa-check" style="color: #00ff88;"></i>';
        setTimeout(() => { btn.innerHTML = originalHTML; }, 1500);
    }
}
</script>

<template>
  <!-- نبدأ مباشرة بالـ Hero بدون أي Header أو Nav -->
  <section class="hero">
    <img src="/avatar.png" alt="NIGHT PULSE X" class="avatar" />
    <h1>NIGHT PULSE X</h1>
    <p>Penetration Testing • Security Research • Future Ready</p>
    <div class="hero-buttons">
      <RouterLink to="/writeups" class="btn btn-primary"><i class="fas fa-book"></i> Explore Writeups</RouterLink>
      <RouterLink to="/about" class="btn btn-secondary"><i class="fas fa-user"></i> About Me</RouterLink>
    </div>
    <div class="stats">
      <div class="stat">
        <h3>{{ writeupsData.length }}</h3>
        <span>Total Writeups</span>
      </div>
      <div class="stat">
        <h3>0</h3>
        <span>Certifications</span>
      </div>
      <div class="stat">
        <h3>2</h3>
        <span>Months Active</span>
      </div>
    </div>
  </section>

  <h2 class="section-title"><i class="fas fa-star"></i> Featured Writeups</h2>
  <div class="writeups-grid">
    <div v-for="writeup in featured" :key="writeup.name" class="writeup-card">
      <div class="writeup-header">
        <span class="writeup-icon">{{ getCategoryInfo(writeup.category).icon }}</span>
        <h4>{{ writeup.name }}</h4>
      </div>
      <div class="writeup-meta">
        <span class="writeup-os">{{ writeup.os.toUpperCase() }}</span>
        <span class="writeup-level">{{ writeup.level }}</span>
      </div>
      <div class="writeup-category">{{ getCategoryInfo(writeup.category).label }}</div>
      <div v-if="writeup.password" class="writeup-password">
        <span class="password-text">🔑 {{ writeup.password }}</span>
        <button class="copy-btn" @click="copyPassword(writeup.password, $event)"><i class="fas fa-copy"></i></button>
      </div>
      <RouterLink :to="'/writeups'" class="writeup-link">
        Read Writeup <i class="fas fa-arrow-right"></i>
      </RouterLink>
    </div>
  </div>
  <div style="text-align: center; margin-top: 2rem;">
    <RouterLink to="/writeups" class="btn btn-primary"><i class="fas fa-arrow-right"></i> View All</RouterLink>
  </div>

  <div class="quick-grid">
    <div class="quick-card">
      <i class="fas fa-linux"></i>
      <h4>Linux Machines</h4>
      <p>18+ Writeups</p>
      <RouterLink to="/writeups">Explore →</RouterLink>
    </div>
    <div class="quick-card">
      <i class="fas fa-windows"></i>
      <h4>Windows Machines</h4>
      <p>2 Writeups</p>
      <RouterLink to="/writeups">Explore →</RouterLink>
    </div>
    <div class="quick-card">
      <i class="fas fa-trophy"></i>
      <h4>ProLabs</h4>
      <p>1 Writeup</p>
      <RouterLink to="/writeups">Explore →</RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* لا حاجة لاستيراد التصميم هنا، لأنه موجود في main.css */
</style>
