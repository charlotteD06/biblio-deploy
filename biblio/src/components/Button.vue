<template>
  <button :class="['btn', variantClass]">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary' // primary | secondary | outline
  }
})

const variantClass = computed(() => {
  return {
    primary: 'btn-biblio',
    secondary: 'btn-secondary',
    outline: 'btn-outline-secondary'
  }[props.variant]
})
</script>