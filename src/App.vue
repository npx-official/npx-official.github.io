<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Effects from './components/Effects.vue'
</script>

<template>
  <!-- خلفية الموقع -->
  <div class="bg-animation"></div>
  
  <!-- حاوية النجوم -->
  <div class="stars" id="stars"></div>
  
  <!-- تأثيرات الماوس -->
  <div class="mouse-trail" id="mouseTrail"></div>
  <div class="mouse-glow-effect" id="mouseGlowEffect"></div>

  <!-- مكون التأثيرات (يدير النجوم والماوس) -->
  <Effects />

  <!-- شريط التنقل -->
  <div class="container-header">
    <Navbar />
  </div>

  <!-- محتوى الصفحات -->
  <div class="container">
    <RouterView />
  </div>

  <!-- فوتر الموقع -->
  <footer class="footer">
    <p><i class="fas fa-circle" style="color: #6fffe0; font-size: 0.5rem;"></i> 2026 · NIGHT PULSE X</p>
    <div class="social">
      <a href="https://github.com/npx-official" target="_blank"><i class="fab fa-github"></i></a>
      <a href="https://app.hackthebox.com/users/2207141" target="_blank"><i class="fas fa-shield-halved"></i></a>
      <a href="https://tryhackme.com/p/npx.off" target="_blank"><i class="fas fa-user-secret"></i></a>
      <a href="https://www.linkedin.com/in/night-pulse-x-337a89275" target="_blank"><i class="fab fa-linkedin"></i></a>
    </div>
  </footer>
</template>

<style>
/* استيراد التصميم الرئيسي */
@import './assets/main.css';

/* تنسيق الهيدر */
.container-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 3rem 0;
  position: relative;
  z-index: 1;
}

/* تنسيق المحتوى */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 3rem;
  position: relative;
  z-index: 1;
}

/* تنسيق الماوس (يجب أن يكون هنا أيضاً ليتم تطبيقه) */
.mouse-trail {
    position: fixed; width: 8px; height: 8px; background: #6fffe0; border-radius: 50%; pointer-events: none; z-index: 9999; box-shadow: 0 0 20px rgba(111,255,224,0.5), 0 0 60px rgba(111,255,224,0.2); transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s;
}
.mouse-glow-effect {
    position: fixed; width: 200px; height: 200px; background: radial-gradient(circle, rgba(111, 255, 224, 0.06), transparent 70%); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%, -50%); transition: width 0.3s, height 0.3s;
}
.mouse-glow-effect.active {
    width: 350px; height: 350px; background: radial-gradient(circle, rgba(111, 255, 224, 0.12), transparent 70%);
}

/* تنسيق الفوتر */
.footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(111, 255, 224, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.footer p { color: rgba(255,255,255,0.2); font-size: 0.9rem; }
.social a { color: rgba(255,255,255,0.2); font-size: 1.2rem; margin-left: 1.5rem; transition: 0.3s; }
.social a:hover { color: #6fffe0; transform: translateY(-3px); }
</style>
