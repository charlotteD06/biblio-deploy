<template>
  <a :href="href" class="footer-link">
    <slot />
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    default: '#'
  }
})
</script>

<style scoped>
.footer-link {
  color: var(--text-muted);
  text-decoration: none;
  display: block;
  margin-bottom: 6px;
}

.footer-link:hover {
  color: var(--text-primary);
}
</style>