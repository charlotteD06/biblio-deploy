<script setup>
import FooterLink from './FooterLink.vue'
</script>

<template>

<!-- FOOTER -->
<footer>
  <div class="row g-4 mb-4">

    <!-- Spalte 1: Marke + Kurzbeschreibung + Social Links -->
    <div class="col-12 col-lg-5">
      <div class="logo mb-2">Biblio</div>
      <p style="font-size:0.83rem; color:var(--text-muted); max-width:240px">
        Dein Ort, um Bücher zu entdecken, Geschichten zu teilen und Leser weltweit zu verbinden.
      </p>
      <!-- Social-Links (einfache Textlinks) -->
      <div class="d-flex gap-3 mt-2">
        <a href="#"><i class="bi bi-instagram"></i> Instagram</a>
        <a href="#"><i class="bi bi-facebook"></i> Facebook</a>
      </div>
    </div>
    <!-- Spalte 4 -->
    <div class="d-flex gap-3 mt-2">
      <router-link to="/impressum">Impressum</router-link>
      <router-link to="/datenschutz">Datenschutzerklärung</router-link>
    </div>
    
  </div>

  <!-- Footer-Unterzeile -->
  <div class="d-flex justify-content-between align-items-center pt-3"
       style="border-top: 1px solid var(--border);">
    <p class="mb-0" style="font-size:0.78rem; color:var(--text-muted)">© 2026 Biblio. All rights reserved.</p>
    <div class="footer-tagline" style="color:var(--text-muted)">Read more. Connect deeper.</div>
  </div>
</footer>

</template>