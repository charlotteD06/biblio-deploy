<template>
  <section 
  id="popular-section"
  class="popular-section"
  :class="{ 'no-box': !boxed }"
  >

<div class="d-flex justify-content-between mb-3">
  <h2 v-if="showTitle">
   Beliebte Bücher
  </h2>
</div>

<BookFilter @filter="$emit('filter', $event)" />

    <div class="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-3">

      <div class="col" v-for="book in books" :key="book.id">
        <div class="book-card">

          <div class="book-cover-img">
            <img :src="book.image" :alt="book.title" 
            @error="e => e.target.style.display = 'none'"
            />

            <BookmarkButton
              :isActive="isFavorite(book)"
              @toggle="$emit('toggle-bookmark', book)"
            />
          </div>

          <h4 class="mt-2">{{ book.title }}</h4>
          <div class="author">{{ book.author }}</div>

          <div class="stars">
            <i
              v-for="n in 5"
              :key="n"
              class="bi"
              :class="n <= Math.round(book.rating) ? 'bi-star-fill' : 'bi-star'"
            ></i>

            <span class="text-muted">{{ book.rating }}</span>
          </div>

          <div class="book-actions">

            <router-link
              :to="`/product/${book.id}`"
              class="btn btn-sm btn-outline-secondary"
            >
              Details
            </router-link>

            <router-link
              v-if="authStore.isAdmin"
              :to="`/book/${book.id}/edit`"
              class="btn btn-sm btn-outline-secondary"
            >
              <i class="bi bi-pencil"></i> Bearbeiten
            </router-link>

          </div>

        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
import { useAuthStore } from '../stores/auth.js'
import BookmarkButton from './BookmarkButton.vue'
import BookFilter from './BookFilter.vue'

const authStore = useAuthStore()

// Props kommen von ProductCatalog
defineProps({
  books: Array,
  isFavorite: Function,
  showTitle: {
    type: Boolean,
    default: true
  },

  boxed: {
  type: Boolean,
  default: true
}

})

defineEmits([
  'toggle-bookmark',
  'filter'
])
</script>
<style scoped>
.book-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.no-box {
  background: transparent !important;

  padding: 0 !important;

  border-radius: 0 !important;

  box-shadow: none !important;
}
</style>


