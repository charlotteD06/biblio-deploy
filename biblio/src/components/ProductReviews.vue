<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
})

const reviews = ref([])
const isLoading = ref(false)
const error = ref(null)

async function fetchReviews() {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch(
      `http://localhost:8080/api/books/${props.productId}/reviews`
    )

    if (!response.ok) throw new Error()

    reviews.value = await response.json()
  } catch {
    error.value = 'Bewertungen konnten nicht geladen werden.'
    reviews.value = []
  } finally {
    isLoading.value = false
  }
}

watch(
  () => props.productId,
  () => fetchReviews(),
  { immediate: true }
)
</script>

<template>
  <section class="reviews-section mt-5">
    <h3>Reviews</h3>

    <div v-if="isLoading" class="text-muted">
      Reviews werden geladen...
    </div>

    <div v-else-if="error" class="alert alert-light border">
      {{ error }}
    </div>

    <div v-else-if="reviews.length === 0" class="text-muted">
      Noch keine Reviews vorhanden.
    </div>

    <div v-else class="reviews-list">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="review-card"
      >
        <div class="d-flex justify-content-between align-items-center mb-2">
          <strong>{{ review.username || review.author || 'Gast' }}</strong>

          <span class="stars">
            <i
              v-for="n in 5"
              :key="n"
              class="bi"
              :class="n <= Math.round(review.rating) ? 'bi-star-fill' : 'bi-star'"
            ></i>
          </span>
        </div>

        <p class="mb-0">
          {{ review.comment || review.text || review.content }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
  border-top: 1px solid var(--border);
  padding-top: 2rem;
}

.reviews-section h3 {
  font-family: 'Playfair Display', serif;
  margin-bottom: 1rem;
}

.review-card {
  background: var(--beige-dark);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
}

.stars {
  color: #f0a500;
  font-size: 0.85rem;
}
</style>