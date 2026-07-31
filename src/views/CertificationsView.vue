<template>
  <h1 class="page-title"><i class="fas fa-certificate"></i> Certifications</h1>

  <div class="cert-grid">
    <!-- eJPT -->
    <div class="cert-card">
      <span class="icon"><i class="fas fa-shield-halved"></i></span>
      <h4>eJPT</h4>
      <p class="desc">eLearnSecurity Junior Penetration Tester</p>
      <span class="status planned">📝 Planned</span>
    </div>
    <!-- CPTS -->
    <div class="cert-card">
      <span class="icon"><i class="fas fa-code"></i></span>
      <h4>CPTS</h4>
      <p class="desc">Certified Penetration Testing Specialist</p>
      <span class="status progress">🔄 In Progress</span>
    </div>
    <!-- OSCP -->
    <div class="cert-card">
      <span class="icon"><i class="fas fa-cloud"></i></span>
      <h4>OSCP</h4>
      <p class="desc">Offensive Security Certified Professional</p>
      <span class="status next">🎯 Next Target</span>
    </div>
    <!-- CEH -->
    <div class="cert-card">
      <span class="icon"><i class="fas fa-lock"></i></span>
      <h4>CEH</h4>
      <p class="desc">Certified Ethical Hacker</p>
      <span class="status planned">📝 Planned</span>
    </div>
  </div>

  <div class="learning-path">
    <h3><i class="fas fa-road"></i> Learning Path</h3>
    <div class="path-steps">
      <div class="path-step">
        <div class="step-icon planned"><i class="fas fa-flag"></i></div>
        <div class="step-content">
          <h4>eJPT</h4>
          <p>Not started yet</p>
        </div>
        <span class="step-status planned">Planned</span>
      </div>
      <div class="path-step">
        <div class="step-icon progress"><i class="fas fa-spinner fa-spin"></i></div>
        <div class="step-content">
          <h4>CPTS</h4>
          <p>Studying for the exam</p>
        </div>
        <span class="step-status progress">In Progress</span>
      </div>
      <div class="path-step">
        <div class="step-icon next"><i class="fas fa-rocket"></i></div>
        <div class="step-content">
          <h4>OSCP</h4>
          <p>Main target — 2027</p>
        </div>
        <span class="step-status next">Next Target</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cert-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 3rem; }
.cert-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(111, 255, 224, 0.06); border-radius: 1.5rem; padding: 2rem 1.5rem; text-align: center; transition: 0.3s; }
.cert-card:hover { transform: translateY(-6px); border-color: #6fffe0; }
.cert-card .icon { font-size: 2.8rem; color: #6fffe0; display: block; margin-bottom: 0.8rem; }
.cert-card h4 { color: #e0e5f0; font-size: 1.4rem; margin-bottom: 0.3rem; }
.cert-card .desc { color: #b6c8e0; font-size: 0.9rem; margin-bottom: 1rem; }
.cert-card .status { display: inline-block; padding: 0.25rem 1.2rem; border-radius: 30px; font-size: 0.8rem; font-weight: 600; }
.cert-card .status.planned { background: rgba(100,100,255,0.15); color: #6688ff; }
.cert-card .status.progress { background: rgba(255,200,0,0.15); color: #ffcc00; }
.cert-card .status.next { background: rgba(0,255,200,0.15); color: #6fffe0; }
.learning-path { background: rgba(255,255,255,0.02); border: 1px solid rgba(111, 255, 224, 0.06); border-radius: 1.5rem; padding: 2rem; text-align: center; }
.learning-path h3 { color: #6fffe0; font-size: 1.6rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 12px; }
.path-steps { display: flex; flex-direction: column; gap: 1rem; max-width: 600px; margin: 0 auto; }
.path-step { display: flex; align-items: center; gap: 1.5rem; padding: 0.8rem 1.5rem; background: rgba(0,0,0,0.2); border-radius: 1rem; border-left: 4px solid rgba(111,255,224,0.15); transition: 0.3s; }
.path-step:hover { border-left-color: #6fffe0; }
.path-step .step-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
.path-step .step-icon.planned { background: rgba(100,100,255,0.15); color: #6688ff; }
.path-step .step-icon.progress { background: rgba(255,200,0,0.15); color: #ffcc00; }
.path-step .step-icon.next { background: rgba(0,255,200,0.15); color: #6fffe0; }
.path-step .step-content { flex: 1; text-align: left; }
.path-step .step-content h4 { color: #e0e5f0; font-size: 1.1rem; }
.path-step .step-content p { color: #b6c8e0; font-size: 0.9rem; }
.path-step .step-status { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.8rem; border-radius: 20px; }
.path-step .step-status.planned { background: rgba(100,100,255,0.1); color: #6688ff; }
.path-step .step-status.progress { background: rgba(255,200,0,0.1); color: #ffcc00; }
.path-step .step-status.next { background: rgba(0,255,200,0.1); color: #6fffe0; }
.page-title { font-size: 2.8rem; font-weight: 700; text-align: center; margin-bottom: 2.5rem; background: linear-gradient(135deg, #6fffe0, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; justify-content: center; gap: 15px; }
</style>
