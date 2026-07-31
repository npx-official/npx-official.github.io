<script setup>
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <header class="header">
    <div class="logo">
      <img src="@/assets/npx-logo.svg" alt="NPX" />
      <span>NIGHT PULSE X</span>
    </div>
    <nav class="nav">
      <RouterLink to="/">
        <i class="fas fa-house"></i> Home
      </RouterLink>
      <RouterLink to="/about">
        <i class="fas fa-user-astronaut"></i> About
      </RouterLink>
      <RouterLink to="/writeups">
        <i class="fas fa-pen-fancy"></i> Writeups
      </RouterLink>
      <RouterLink to="/certifications">
        <i class="fas fa-certificate"></i> Certs
      </RouterLink>
      <RouterLink to="/contact">
        <i class="fas fa-envelope"></i> Contact
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
/* تم نقل التصميم إلى main.css ليتم تطبيقه عالمياً */
</style>
