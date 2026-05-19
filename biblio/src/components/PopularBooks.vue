<template>
  <section class="popular-section">

    <div class="d-flex justify-content-between mb-4">
      <h2>Beliebte Bücher</h2>
    </div>

    <div class="row row-cols-2 row-cols-md-3 row-cols-xl-5 g-3">

      <div class="col" v-for="book in books" :key="book.id">
        <div class="book-card">

          <div class="book-cover-img">
            <img :src="book.image" :alt="book.title" />

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

          <router-link
            :to="`/product/${book.id}`"
            class="btn btn-sm btn-outline-secondary mt-2"
          >
            Details
          </router-link>

        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
import BookmarkButton from './BookmarkButton.vue'

// Props kommen von ProductCatalog
defineProps({
  books: Array,
  isFavorite: Function
})

defineEmits(['toggle-bookmark'])
</script>


