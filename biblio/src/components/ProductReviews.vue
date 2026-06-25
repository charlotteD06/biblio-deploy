<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
})

const authStore = useAuthStore()
const reviews = ref([])
const isLoading = ref(false)
const error = ref(null)

const reviewerName = ref('')
const comment = ref('')
const rating = ref(5)

async function createReview() {

 if (!comment.value)
  return

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/books/${props.productId}/reviews`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
      reviewerName: authStore.isLoggedIn
        ? authStore.user.name
        : (reviewerName.value || 'Gast'),

      comment: comment.value,
      rating: rating.value
    })

    }
  )

  if(response.ok){

    reviewerName.value = ''
    comment.value = ''
    rating.value = 5

    fetchReviews()

  }

}

async function deleteReview(reviewId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/books/${props.productId}/reviews/${reviewId}`,
    {
      method: 'DELETE'
    }
  )

  if (response.ok) {
    fetchReviews()
  }
}

async function fetchReviews() {
  isLoading.value = true
  error.value = null

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/books/${props.productId}/reviews`
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
          <strong>{{ review.reviewerName || 'Gast' }}</strong>
            <div class="d-flex align-items-center gap-2"></div>
          <span class="stars">
            <i
              v-for="n in 5"
              :key="n"
              class="bi"
              :class="n <= Math.round(review.rating) ? 'bi-star-fill' : 'bi-star'"
            ></i>
          </span>
        <button
            v-if="authStore.isAdmin"
            class="btn btn-sm btn-outline-danger"
            @click="deleteReview(review.id)"
            >
            Löschen
        </button>
        </div>

        <p class="mb-0">
          {{ review.comment || review.text || review.content }}
        </p>
      </div>
    </div>
  </section>
  <div v-if="authStore.isLoggedIn">
  <div class="review-form mt-4">

  <h5>Bewertung schreiben</h5>

  <input
    v-model="reviewerName"
    class="form-control mb-2"
    placeholder="Dein Name"
  />

  <select
    v-model="rating"
    class="form-control mb-2"
  >
    <option :value="1">★ 1</option>
    <option :value="2">★★ 2</option>
    <option :value="3">★★★ 3</option>
    <option :value="4">★★★★ 4</option>
    <option :value="5">★★★★★ 5</option>
  </select>

  <textarea
    v-model="comment"
    class="form-control mb-3"
    placeholder="Deine Rezension..."
  ></textarea>

  <button
    class="btn btn-dark"
    @click="createReview"
  >
    Bewertung speichern
  </button>

  </div>
  </div>

  <div
  v-else
  class="login-required-card"
>

  <i class="bi bi-lock-fill"></i>

  <h3>
    Bewertung schreiben
  </h3>

  <p>
    Melde dich an oder registriere dich,
    um Bewertungen zu schreiben.
  </p>

  <RouterLink
    to="/login"
    class="btn-biblio btn"
  >
    Anmelden
  </RouterLink>

</div>

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

.login-required-card {
  margin-top: 2rem;

  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 2rem;

  text-align: center;

  border: 1px solid rgba(255,255,255,.45);
}

.login-required-card i {
  font-size: 2rem;

  color: var(--accent);

  margin-bottom: 1rem;
}

.login-required-card p {
  color: var(--text-muted);

  margin-bottom: 1rem;
}
</style>