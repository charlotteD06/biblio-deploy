<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFriendsStore } from '../stores/friends.js'
import { characters } from '../stores/characters'
import { useBookClubStore } from '../stores/bookclubs'
import { useLibraryStore } from '../stores/library'

const libraryStore = useLibraryStore()
const route = useRoute()
const router = useRouter()
const friendsStore = useFriendsStore()
const bookClubStore = useBookClubStore()

const books = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/api/books')
    books.value = await response.json()
  } catch (err) {
    console.error(err)
  }
})

const friend = computed(() =>
  friendsStore.allUsers.find(
    f => f.id === Number(route.params.id)
  )
)

const friendClubs = computed(() => {

  if (!friend.value)
    return []

  return bookClubStore.clubs.filter(club =>

    club.members.some(
      member => member.name === friend.value.name
    )

  )

})



const currentBookData = computed(() =>
  books.value.find(
    b => b.id === friend.value?.currentBook.id
  )
)

const selectedCharacter = ref(null)

const completedBooks = computed(() =>
  friend.value?.completedBooks || []
)

const yearlyGoal = 50

const booksRead = computed(() =>
  completedBooks.value.length
)

const challengeProgress = computed(() =>
  Math.round((booksRead.value / yearlyGoal) * 100)
)

const booksLeft = computed(() =>
  Math.max(yearlyGoal - booksRead.value, 0)
)

function showCharacter(characterName) {
  selectedCharacter.value =
    characters[characterName] || {
      book: 'Unbekannt',
      description: 'Keine Beschreibung vorhanden.'
    }
}

function goToBook(id) {
  router.push(`/product/${id}`)
}
</script>

<template>
  <main class="friend-profile-page">

    <router-link
      to=""
      class="back-link mb-4 d-inline-flex align-items-center gap-2"
      @click="$router.back()"
    >
      <i class="bi bi-arrow-left"></i>
      Zurück
    </router-link>

    <!-- HEADER -->
    <section class="friend-hero">
      <div class="friend-avatar">
        <i class="bi bi-person-fill"></i>
      </div>

      <div>
        <p class="eyebrow">Freundesprofil</p>
        <h1>{{ friend.name }}</h1>
        <p class="bio">{{ friend.bio }}</p>
      </div>
    </section>

    <!-- QUOTE -->
    <section class="quote-box">
      “{{ friend.quote }}”
    </section>

    <!-- GRID -->
    <section class="friend-grid">

      <!-- CHALLENGE + CURRENT BOOK -->
      <div class="card challenge-card">

        <h2>Reading Challenge 2026</h2>

        <div class="challenge-number">
          <strong>{{ booksRead }}</strong> / 50 Bücher
        </div>

        <div class="progress-bar">
          <div
            class="fill"
            :style="{ width: challengeProgress + '%' }"
          ></div>
        </div>

        <p>{{ booksLeft }} Bücher bis zum Ziel</p>

        <hr />

        <h3>Aktuell liest</h3>

        <p><strong>{{ friend.currentBook.title }}</strong></p>
        <p class="author">{{ friend.currentBook.author }}</p>

      </div>

      <!-- FAVORITES -->
      <div class="card">

        <h2>Lieblingsbücher</h2>

        <div class="favorite-books">

          <div
            v-for="b in friend.favoriteBooks"
            :key="b.id"
            class="book-item"
          >
            <img :src="b.image" />

            <strong>{{ b.title }}</strong>
            <span>{{ b.author }}</span>
          </div>

        </div>

      </div>

    </section>

  </main>
</template>

<style scoped>
.friend-profile-page {
  min-height: calc(100vh - 80px);
  padding: 3rem clamp(1.5rem, 6vw, 6rem);

  background:
    radial-gradient(circle at top right, rgba(138,161,177,0.16), transparent 34%),
    var(--beige);
}

/* HERO - wie Profilseite */
.friend-hero {
  max-width: 1200px;
  margin: 0 auto 1.5rem;

  display: flex;
  align-items: center;
  gap: 1.5rem;

  padding: 2rem;
  border-radius: 24px;

  background: rgba(247,241,230,0.85);
  border: 1px solid rgba(255,255,255,0.45);
}

/* AVATAR */
.friend-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;

  display: grid;
  place-items: center;

  background: var(--beige-dark);
  color: var(--accent);
  font-size: 2rem;
}

/* NAME */
.friend-hero h1 {
  font-family: Georgia, serif;
  font-size: 2.8rem;
}

/* QUOTE - wichtiger als normale Card */
.quote-box {
  max-width: 1200px;
  margin: 0 auto 1rem;

  padding: 1.2rem 1.5rem;
  border-radius: 18px;

  background: rgba(255,255,255,0.7);
  font-style: italic;

  border-left: 4px solid var(--accent);
  color: var(--text-muted);
}

/* GRID - WICHTIGER FIX */
.friend-grid {
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* CARD - NICHT FLACH MEHR */
.card {
  background: rgba(247,241,230,0.9);
  border-radius: 24px;
  padding: 1.6rem;

  border: 1px solid rgba(255,255,255,0.5);

  box-shadow:
    0 10px 25px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.6);

  transition: .25s;
  font-family: Georgia, serif;
}

.card:hover {
  transform: translateY(-2px);
}

/* CHALLENGE HIERARCHY FIX */
.challenge-card h2 {
  font-family: Georgia, serif;
  font-size: 1.6rem;
}

.challenge-number {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  font-size: 1.1rem;
}

/* PROGRESS BAR */
.progress-bar {
  height: 12px;
  border-radius: 999px;

  background: rgba(0,0,0,0.08);
  overflow: hidden;
}

.progress-bar .fill {
  height: 100%;
  background: var(--accent);
}

/* CURRENT BOOK FIX */
.challenge-card h3 {
  margin-top: 1.5rem;
  font-family: Georgia, serif;
}

/* FAVORITES*/
.favorite-books {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;

}

.book-item img {
  width: 100%;
  height: 160px;
  border-radius: 10px;
  object-fit: cover;
}

.back-link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.88rem;
  transition: 0.2s;
  margin-left: .1rem;
  margin-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: .4rem;
}

.back-link:hover {
  color: var(--accent);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .friend-grid {
    grid-template-columns: 1fr;
  }

  .current-reading-card {
    grid-row: auto;
  }

  .current-reading-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .current-book-cover {
    width: 100%;
    height: auto;
  }
}
</style>