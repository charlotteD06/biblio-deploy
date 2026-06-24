<script setup>
import { ref, computed } from 'vue'
import { useLibraryStore } from '../stores/library.js'

const libraryStore = useLibraryStore()
const activeTab = ref('current')

const tabs = [
  { id: 'current', label: 'Aktuell' },
  { id: 'completed', label: 'Abgeschlossen' },
  { id: 'wishlist', label: 'Wunschliste' }
]

const visibleBooks = computed(() => {
  if (activeTab.value === 'current') return libraryStore.currentBooks
  if (activeTab.value === 'completed') return libraryStore.completedBooks
  return libraryStore.wishlistBooks
})

function removeBook(bookId) {
  libraryStore.removeBook(bookId)
}
</script>

<template>
  <main class="library-page">

    <section class="library-hero">
      <div>
        <p class="eyebrow">Meine Bücher</p>
        <h1>Bibliothek</h1>
        <p>
          Verwalte deine aktuellen Bücher, abgeschlossenen Titel und deine Wunschliste.
        </p>
      </div>

      <router-link to="/books" class="add-books-btn">
        <i class="bi bi-plus-lg me-2"></i>
        Bücher hinzufügen
      </router-link>
    </section>

    <section class="library-content">

      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="visibleBooks.length === 0" class="empty-state">
        <i class="bi bi-book"></i>
        <h2>Noch keine Bücher</h2>
        <p>Füge über die Buchdetailseite Bücher zu dieser Liste hinzu.</p>
      </div>

      <div v-else class="book-grid">
        <article
          v-for="book in visibleBooks"
          :key="book.id"
          class="book-item"
        >
          <router-link :to="`/product/${book.id}`">
            <img :src="book.image" :alt="book.title" />
          </router-link>

          <h3>{{ book.title }}</h3>
          <p>{{ book.author }}</p>

          <div class="rating">
            <i
              v-for="n in 5"
              :key="n"
              class="bi"
              :class="n <= Math.round(book.rating || 0) ? 'bi-star-fill' : 'bi-star'"
            ></i>
          </div>

          <button class="remove-btn" @click="removeBook(book.id)">
            Entfernen
          </button>
        </article>
      </div>

    </section>

  </main>
</template>

<style scoped>
.library-page {
  min-height: calc(100vh - 80px);
  background:
    radial-gradient(circle at top right, rgba(138,161,177,0.16), transparent 34%),
    var(--beige);
  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.library-hero {
  max-width: 1200px;
  margin: 0 auto 2.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  margin-bottom: 0.4rem;
}

.library-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  margin-bottom: 0.6rem;
}

.library-hero p {
  color: var(--text-muted);
  max-width: 650px;
  font-size: 1.05rem;
}

.add-books-btn {
  background: var(--accent);
  color: white;
  border-radius: 50px;
  padding: 0.75rem 1.4rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.14);
  white-space: nowrap;
}

.library-content {
  max-width: 1200px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  gap: 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2.2rem;
}

.tabs button {
  background: transparent;
  border: none;
  padding: 0.9rem 0;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
}

.tabs button.active {
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
  gap: 2.5rem 2rem;
}

.book-item img {
  width: 135px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.14);
  transition: transform 0.2s ease;
}

.book-item img:hover {
  transform: translateY(-3px);
}

.book-item h3 {
  font-size: 0.95rem;
  margin: 0.8rem 0 0.2rem;
}

.book-item p {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 0;
}

.rating {
  color: #f0a500;
  font-size: 0.78rem;
  margin-top: 0.3rem;
}

.remove-btn {
  margin-top: 0.6rem;
  border: 1px solid var(--border);
  border-radius: 50px;
  background: var(--beige-dark);
  padding: 0.35rem 0.8rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.empty-state {
  background: rgba(247, 241, 230, 0.76);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 24px;
  padding: 4rem 1rem;
  text-align: center;
  box-shadow:
    0 12px 30px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.65);
}

.empty-state i {
  font-size: 3rem;
  color: var(--accent);
}

.empty-state h2 {
  font-family: Georgia, serif;
  margin-top: 1rem;
}

.empty-state p {
  color: var(--text-muted);
}

@media (max-width: 700px) {
  .library-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .book-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>