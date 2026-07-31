<script setup>
import { ref, computed } from 'vue'
import { writeupsData } from '../data/writeupsData'

const currentFilter = ref('all')

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

const filteredWriteups = computed(() => {
    if (currentFilter.value === 'all') return writeupsData
    return writeupsData.filter(w => {
        const category = w.category || ''
        const level = w.level || ''
        const os = w.os || ''
        return category.includes(currentFilter.value) || 
               level.includes(currentFilter.value) || 
               os.includes(currentFilter.value)
    })
})

const stats = computed(() => {
    const total = writeupsData.length
    const linuxCount = writeupsData.filter(w => w.os === 'linux').length
    const windowsCount = writeupsData.filter(w => w.os === 'windows').length
    const prolabsCount = writeupsData.filter(w => w.os === 'prolabs').length
    const hacker101Count = writeupsData.filter(w => w.os === 'hacker101').length
    return { total, linuxCount, windowsCount, prolabsCount, hacker101Count }
})

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
  <h1 class="page-title"><i class="fas fa-pen-fancy"></i> All Writeups</h1>

  <div class="filter-bar">
    <button class="filter-btn" :class="{ active: currentFilter === 'all' }" @click="currentFilter = 'all'">All</button>
    <button class="filter-btn" :class="{ active: currentFilter === 'linux' }" @click="currentFilter = 'linux'">🐧 Linux</button>
    <button class="filter-btn" :class="{ active: currentFilter === 'windows' }" @click="currentFilter = 'windows'">🪟 Windows</button>
    <button class="filter-btn" :class="{ active: currentFilter === 'prolabs' }" @click="currentFilter = 'prolabs'">🏆 ProLabs</button>
    <button class="filter-btn" :class="{ active: currentFilter === 'easy' }" @click="currentFilter = 'easy'">🟢 Easy</button>
    <button class="filter-btn" :class="{ active: currentFilter === 'medium' }" @click="currentFilter = 'medium'">🟡 Medium</button>
    <button class="filter-btn" :class="{ active: currentFilter === 'hard' }" @click="currentFilter = 'hard'">🔴 Hard</button>
    <button class="filter-btn" :class="{ active: currentFilter === 'insane' }" @click="currentFilter = 'insane'">💀 Insane</button>
    <button class="filter-btn" :class="{ active: currentFilter === 'hacker101' }" @click="currentFilter = 'hacker101'">🛡️ Hacker101</button>
  </div>

  <div class="writeups-stats">
    <div class="stat-item">
      <span class="stat-number">{{ stats.total }}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{{ stats.linuxCount }}</span>
      <span class="stat-label">🐧 Linux</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{{ stats.windowsCount }}</span>
      <span class="stat-label">🪟 Windows</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{{ stats.prolabsCount }}</span>
      <span class="stat-label">🏆 ProLabs</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">{{ stats.hacker101Count }}</span>
      <span class="stat-label">🛡️ Hacker101</span>
    </div>
  </div>

  <div class="writeups-grid">
    <div v-for="writeup in filteredWriteups" :key="writeup.name" class="writeup-card">
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
      
      <!-- تم إزالة التشفير، أصبح الرابط مباشراً -->
      <a :href="writeup.path" class="writeup-link">
        Read Writeup <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* تنسيقات البطاقات */
.writeup-password { display: flex; align-items: center; justify-content: space-between; margin: 8px 0; padding: 6px 12px; background: rgba(111, 255, 224, 0.05); border-radius: 8px; border: 1px solid rgba(111, 255, 224, 0.2); transition: all 0.3s ease; }
.writeup-password:hover { background: rgba(111, 255, 224, 0.1); border-color: #6fffe0; box-shadow: 0 0 15px rgba(111, 255, 224, 0.1); }
.writeup-password .password-text { color: #6fffe0; font-family: 'Courier New', monospace; font-size: 12px; word-break: break-all; flex: 1; letter-spacing: 0.5px; }
.copy-btn { background: rgba(111, 255, 224, 0.15); border: 1px solid rgba(111, 255, 224, 0.2); border-radius: 6px; color: #6fffe0; cursor: pointer; padding: 4px 10px; transition: 0.3s; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.copy-btn:hover { background: #6fffe0; color: #0a0a0f; transform: scale(1.05); box-shadow: 0 0 20px rgba(111, 255, 224, 0.2); }

.writeup-link { color: #6fffe0; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: 0.3s; margin-top: 0.5rem; cursor: pointer; }
.writeup-link:hover { color: #fff; gap: 12px; }

/* باقي التنسيقات */
.filter-bar { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 2rem; justify-content: center; }
.filter-btn { padding: 0.5rem 1.2rem; border-radius: 30px; border: 1px solid rgba(111, 255, 224, 0.06); background: rgba(255,255,255,0.02); color: rgba(255,255,255,0.5); cursor: pointer; transition: 0.3s; }
.filter-btn:hover { border-color: #6fffe0; color: #fff; }
.filter-btn.active { background: linear-gradient(135deg, #6fffe0, #a78bfa); color: #0a0a0f; border-color: transparent; }
.writeups-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(111, 255, 224, 0.06); border-radius: 1.5rem; margin-bottom: 2rem; }
.stat-item { text-align: center; }
.stat-number { font-size: 2rem; font-weight: 700; color: #6fffe0; display: block; }
.stat-label { color: rgba(255,255,255,0.4); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
.writeups-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.writeup-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(111, 255, 224, 0.06); border-radius: 1.5rem; padding: 1.5rem; transition: 0.3s; }
.writeup-card:hover { transform: translateY(-6px); border-color: #6fffe0; }
.writeup-header { display: flex; align-items: center; gap: 10px; margin-bottom: 0.5rem; }
.writeup-header .writeup-icon { font-size: 1.5rem; }
.writeup-header h4 { color: #6fffe0; font-size: 1.1rem; }
.writeup-meta { display: flex; gap: 10px; margin-bottom: 0.5rem; }
.writeup-meta span { font-size: 0.7rem; padding: 0.2rem 0.8rem; border-radius: 20px; text-transform: uppercase; font-weight: 600; }
.writeup-meta .writeup-os { background: rgba(0,255,200,0.15); color: #6fffe0; }
.writeup-meta .writeup-level { background: rgba(124,58,237,0.15); color: #a78bfa; }
.writeup-category { color: rgba(255,255,255,0.4); font-size: 0.85rem; margin-bottom: 0.5rem; }
.page-title { font-size: 2.8rem; font-weight: 700; text-align: center; margin-bottom: 2.5rem; background: linear-gradient(135deg, #6fffe0, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; justify-content: center; gap: 15px; }
</style>
