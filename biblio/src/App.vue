<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import AppToast from './components/AppToast.vue'
</script>

<AppToast />

<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

