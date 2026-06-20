<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()
console.log('User:', authStore.user)


const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
})

const reviews = ref([])
const isLoading = ref(false)
const error = ref(null)

const reviewerName = ref('')
const comment = ref('')
const rating = ref(5)

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

  async function createReview() {
    if (!comment.value.trim()) return

  const newReview = {
    reviewerName: authStore.isLoggedIn
      ? authStore.user.name
      : (reviewerName.value || 'Gast'),

    comment: comment.value,
    rating: rating.value
  }

  console.log('Review wird gesendet:', newReview)

  try {
    const response = await fetch(
      `http://localhost:8080/api/books/${props.productId}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReview)
      }
    )

    if (response.ok) {
      comment.value = ''
      rating.value = 5
      fetchReviews()
    }
  } catch {
    alert('Bewertung konnte nicht gespeichert werden.')
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

    <div v-else-if="reviews.length === 0" class="text-muted mb-3">
      Noch keine Reviews vorhanden.
    </div>

    <div v-else class="reviews-list">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="review-card"
      >
        <div class="d-flex justify-content-between align-items-center mb-2">
          <strong>{{ review.reviewerName || 'Gast' }}</strong>

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
          {{ review.comment }}
        </p>
      </div>
    </div>

    <div class="review-form mt-4">
      <h5>Neue Bewertung schreiben</h5>

    <input
      v-if="!authStore.isLoggedIn"
      v-model="reviewerName"
      class="form-control mb-2"
      placeholder="Dein Name"
    />

      <select
        v-model="rating"
        class="form-control mb-2"
      >
        <option :value="1">1 Stern</option>
        <option :value="2">2 Sterne</option>
        <option :value="3">3 Sterne</option>
        <option :value="4">4 Sterne</option>
        <option :value="5">5 Sterne</option>
      </select>

      <textarea
        v-model="comment"
        class="form-control mb-2"
        placeholder="Deine Bewertung..."
      ></textarea>

      <div
        v-if="authStore.isLoggedIn"
        class="mb-2 text-muted"
      >
        Bewertung als
        <strong>{{ authStore.user.name }}</strong>
      </div>

      <button
        class="btn btn-dark"
        @click="createReview"
      >
        Bewertung speichern
      </button>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
  border-top: 1px solid var(--border);
  padding-top: 2rem;
}

.reviews-section h3,
.review-form h5 {
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