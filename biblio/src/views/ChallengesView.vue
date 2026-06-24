<script setup>
import { computed } from 'vue'
import { useLibraryStore } from '../stores/library'

const libraryStore = useLibraryStore()

const completedBooks = computed(() =>
  libraryStore.completedBooks
)

const progress = computed(() =>
  completedBooks.value.length
)

const goal = 50

const percentage = computed(() =>
  Math.min(
    Math.round(progress.value / goal * 100),
    100
  )
)
</script>

<template>

  <main class="challenge-detail-page">

    <section class="hero-card">

      <p class="eyebrow">
        Challenge
      </p>

      <h1>
        Reading Challenge 2026
      </h1>

      <p>
        Lies 50 Bücher im Jahr 2026.
      </p>

      <div class="challenge-progress">

        <strong>
          {{ progress }} / {{ goal }}
        </strong>

        <span>
          Bücher gelesen
        </span>

      </div>

      <div class="progress-bar">

        <div
          class="progress-fill"
          :style="{
            width: percentage + '%'
          }"
        />

      </div>

    </section>

    <section class="books-card">

      <div class="section-header">

        <h2>
          Bereits gelesen
        </h2>

        <span>
          {{ progress }} Bücher
        </span>

      </div>

      <div
        v-if="completedBooks.length"
        class="books-grid"
      >

        <div
          v-for="book in completedBooks"
          :key="book.id"
          class="book-item"
        >

          <strong>
            {{ book.title }}
          </strong>

          <p>
            {{ book.author }}
          </p>

        </div>

      </div>

      <div
        v-else
        class="empty-state"
      >

        Noch keine Bücher abgeschlossen.

      </div>

    </section>

  </main>

</template>

<style scoped>
.challenge-detail-page {
  min-height: calc(100vh - 80px);

  background:
    radial-gradient(
      circle at top right,
      rgba(138,161,177,.16),
      transparent 34%
    ),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.hero-card,
.books-card {
  max-width: 1200px;

  margin: 0 auto 1.5rem;

  background: rgba(247,241,230,.76);

  border-radius: 24px;

  padding: 2rem;

  border: 1px solid rgba(255,255,255,.45);

  box-shadow:
    0 12px 30px rgba(0,0,0,.08),
    inset 0 1px 0 rgba(255,255,255,.7);
}

.eyebrow {
  color: var(--accent);

  text-transform: uppercase;

  letter-spacing: .08em;

  font-size: .8rem;
}

.hero-card h1 {
  font-family: Georgia, serif;

  font-size: clamp(2.2rem, 5vw, 4rem);
}

.challenge-progress {
  margin-top: 2rem;
}

.challenge-progress strong {
  display: block;

  font-size: 2.5rem;

  font-family: Georgia, serif;
}

.challenge-progress span {
  color: var(--text-muted);
}

.progress-bar {
  margin-top: 1rem;

  height: 14px;

  border-radius: 999px;

  overflow: hidden;

  background: rgba(0,0,0,.08);
}

.progress-fill {
  height: 100%;

  background: var(--accent);
}

.section-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-family: Georgia, serif;
}

.books-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(240px,1fr));

  gap: 1rem;
}

.book-item {
  background: rgba(255,255,255,.6);

  padding: 1rem;

  border-radius: 18px;
}

.book-item p {
  margin-top: .3rem;

  color: var(--text-muted);
}

.empty-state {
  color: var(--text-muted);

  text-align: center;

  padding: 2rem;
}
</style>