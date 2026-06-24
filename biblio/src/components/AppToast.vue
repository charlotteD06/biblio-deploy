<script setup>
import { useToastStore } from '../stores/toast'

const toastStore = useToastStore()
</script>

<template>

  <div
    v-if="toastStore.show"
    class="toast-container position-fixed top-0 end-0 p-3"
  >

    <div
      class="toast show"
      role="alert"
    >

      <div
        class="toast-header"
      >

        <strong class="me-auto">
          Biblio
        </strong>

      </div>

      <div class="toast-body">

        {{ toastStore.message }}

      </div>

    </div>

  </div>

</template>