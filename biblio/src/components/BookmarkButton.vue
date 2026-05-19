<template>
  <button
    class="bookmark-btn"
    :class="{ active: isActive }"
    aria-label="Lesezeichen"
    @click="$emit('toggle')"
  >
    <i class="bi" :class="isActive ? 'bi-bookmark-fill' : 'bi-bookmark'"></i>
  </button>
</template>

<script setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.bookmark-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.bookmark-btn:hover {
  transform: scale(1.1);
}

.bookmark-btn.active i {
  color: #e74c3c; /* optional Highlight */
}
</style>