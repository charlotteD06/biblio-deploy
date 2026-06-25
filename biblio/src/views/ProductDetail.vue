<template>
  <div class="container py-4" v-if="book">

    <!-- Zurück-Link -->
    <button
      @click="$router.back()"
      class="back-link mb-4 d-inline-flex align-items-center gap-2"
    >
      <i class="bi bi-arrow-left"></i>
      Zurück
    </button>

    <!-- =============================================
         TOAST BANNER
         Erscheint kurz wenn ein Buch zur Liste hinzugefügt wird.
         v-if zeigt ihn nur wenn toast.visible true ist.
    ============================================= -->
    <transition name="slide-down">
      <div v-if="toast.visible" class="toast-banner d-flex align-items-center gap-3">
        <i :class="toast.icon"></i>
        <span>{{ toast.message }}</span>
        <button @click="toast.visible = false" class="toast-close ms-auto">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </transition>

    <!-- Buch-Info: Cover + Details -->
    <div class="row g-4 mt-1">

      <!-- Cover -->
      <div class="col-md-4">
        <img
          :src="book.cover || book.image"
          :alt="book.title"
          class="img-fluid rounded book-cover-img"
          @error="e => e.target.style.display = 'none'"
        />
      </div>

      <!-- Info -->
      <div class="col-md-8">

        <!-- Kategorie-Badge -->
        <span class="category-badge mb-2 d-inline-block">{{ book.category }}</span>

        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author">{{ book.author }}</p>

        <!-- Sterne -->
        <div class="stars mb-3">
          <i v-for="n in 5" :key="n"
             :class="n <= Math.round(book.rating) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
          <span class="rating-num ms-1">{{ book.rating }}</span>
        </div>

        <p class="book-description">{{ book.description }}</p>

        <!-- Trennlinie -->
        <hr class="divider" />

        <!-- Bibliothek-Buttons -->
        <p class="section-label">Zu meiner Bibliothek hinzufügen:</p>

        <div class="d-flex gap-2 flex-wrap">

          <button class="lib-btn current" @click="addToList('current')">
            <i class="bi bi-book me-2"></i>
            Aktuell lesen
          </button>

          <button class="lib-btn wishlist" @click="addToList('wishlist')">
            <i class="bi bi-bookmark me-2"></i>
            Wunschliste
          </button>

          <button class="lib-btn completed" @click="addToList('completed')">
            <i class="bi bi-check-circle me-2"></i>
            Abgeschlossen
          </button>

        </div>

      </div> 
      
    </div>
  
    <ProductReviews :product-id="book.id" />

   

  </div>

  <div v-else class="container py-5 text-center">
    <i class="bi bi-book text-muted" style="font-size: 3rem;"></i>
    <p class="mt-3 text-muted">Buch nicht gefunden.</p>
    <router-link to="/" class="back-link">← Zurück zur Übersicht</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'  // computed nicht mehr nötig
import { useRoute } from 'vue-router'
import { useLibraryStore } from '../stores/library'
import ProductReviews from '../components/ProductReviews.vue'

const libraryStore = useLibraryStore()


const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/books`

const route = useRoute()

// ref statt computed – wird von der API befüllt
const book = ref(null)

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/${route.params.id}`)
    if (!response.ok) throw new Error()
    book.value = await response.json()
  } catch {
    // book bleibt null → "Buch nicht gefunden" wird angezeigt
  }
})

// ── TOAST ──────────────────────────────────────────
// toast.visible steuert ob der Banner sichtbar ist.
// showToast() setzt Nachricht + Icon und blendet ihn
// nach 3 Sekunden automatisch wieder aus.
const toast = ref({
  visible: false,
  message: '',
  icon: '',
})

let toastTimer = null

function showToast(message, icon) {
  // laufenden Timer abbrechen (falls Button schnell hintereinander geklickt)
  if (toastTimer) clearTimeout(toastTimer)

  toast.value = { visible: true, message, icon }

  // nach 3 Sekunden automatisch ausblenden
  toastTimer = setTimeout(() => {
    toast.value.visible = false
  }, 3000)
}

// ── BIBLIOTHEK-AKTIONEN ────────────────────────────
// Je nach Typ wird die passende Store-Methode aufgerufen
// und der Toast mit der richtigen Nachricht gezeigt.
function addToList(type) {
  if (!book.value) return

  if (type === 'current') {
    libraryStore.addToCurrent(book.value)
    showToast(`„${book.value.title}" wird aktuell gelesen`, 'bi bi-book-half')
  } else if (type === 'wishlist') {
    libraryStore.addToWishlist(book.value)
    showToast(`„${book.value.title}" zur Wunschliste hinzugefügt`, 'bi bi-bookmark-heart')
  } else if (type === 'completed') {
    libraryStore.addToCompleted(book.value)
    showToast(`„${book.value.title}" als abgeschlossen markiert`, 'bi bi-check-circle')
  }
}

</script>

<style scoped>
/* ── ZURÜCK-LINK ── */
.back-link {
  background: none;
  border: none;

  padding: 0;

  color: var(--text-muted);
  font-size: 0.88rem;

  cursor: pointer;
  text-decoration: none;
}

.back-link:hover {
  color: var(--accent);
}
/* ── TOAST BANNER ── */
.toast-banner {
  background-color: var(--accent);
  color: #fff;
  border-radius: 12px;
  padding: 0.85rem 1.2rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  box-shadow: 0 4px 16px rgba(138, 161, 177, 0.35);
}

.toast-close {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: 0.8;
  font-size: 0.8rem;
  padding: 0;
}
.toast-close:hover { opacity: 1; }

/* Slide-Down Animation für den Toast */
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* ── BUCH-COVER ── */
.book-cover-img {
  box-shadow: 4px 8px 24px rgba(0,0,0,0.15);
}

/* ── KATEGORIE-BADGE ── */
.category-badge {
  font-size: 0.72rem;
  background: var(--beige-mid);
  color: var(--text-muted);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  border: 1px solid var(--border);
  letter-spacing: 0.05em;
}

/* ── BUCH-INFO ── */
.book-title {
  font-family: 'Georgia', serif;
  color: var(--heading);
  font-size: 1.9rem;
  margin-bottom: 0.2rem;
}

.book-author {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.book-description {
  color: var(--text);
  font-size: 0.93rem;
  line-height: 1.7;
}

.stars { color: #f0a500; font-size: 0.85rem; }
.rating-num { color: var(--text-muted); font-size: 0.8rem; }

.divider { border-color: var(--border); }

.section-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

/* ── BIBLIOTHEK-BUTTONS ── */
.lib-btn {
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s, transform 0.15s;
  display: inline-flex;
  align-items: center;
}

.lib-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.lib-btn:active { transform: translateY(0); }

.lib-btn.current   { background: var(--accent); color: #fff; }
.lib-btn.wishlist  { background: var(--beige-mid); color: var(--heading); border: 1.5px solid var(--border); }
.lib-btn.completed { background: #6a9e7f; color: #fff; }

/* ── KOMMENTARE ── */
.section-title {
  font-family: 'Georgia', serif;
  color: var(--heading);
  font-size: 1.1rem;
}

.comments-list { display: flex; flex-direction: column; gap: 0.75rem; }

.comment-card {
  background: var(--beige-dark);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem 1.2rem;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--beige-mid);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.comment-name { font-size: 0.88rem; color: var(--heading); }
.comment-text { font-size: 0.85rem; color: var(--text); padding-left: 2.6rem; }

/* ── KOMMENTAR-EINGABE ── */
.comment-input-wrap {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.comment-input {
  flex: 1;
  min-width: 200px;
  padding: 0.55rem 1rem;
  border: 1.5px solid var(--border);
  border-radius: 50px;
  background: var(--beige-dark);
  color: var(--text);
  font-family: inherit;
  font-size: 0.88rem;
  outline: none;
}

.comment-input:focus { border-color: var(--accent); }
.comment-input::placeholder { color: var(--text-muted); }

.comment-submit {
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.2rem;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s;
}

.comment-submit:hover { background: var(--accent-hover); }
</style>