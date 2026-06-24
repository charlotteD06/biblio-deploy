<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useLibraryStore } from '../stores/library.js'
import { useFriendsStore } from '../stores/friends.js'
import { useBookClubStore } from '../stores/bookclubs.js'

const router = useRouter()
const authStore = useAuthStore()
const libraryStore = useLibraryStore()
const showFullDescription = ref(false)
const currentBook = computed(() => {
  return libraryStore.currentBooks[0] || null
})

const newPage = ref(currentBook.value?.currentPage || 0)

const readingLog = ref(
  JSON.parse(localStorage.getItem('biblio-reading-log')) || []
)


const recommendedBooks = [
  {
    id: 1,
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    image: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg'
  },
  {
    id: 2,
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    image: 'https://covers.openlibrary.org/b/isbn/9780140449174-L.jpg'
  },
  {
    id: 3,
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    image: 'https://covers.openlibrary.org/b/isbn/9780571364909-L.jpg'
  }
]

const friendsStore = useFriendsStore()
const bookClubStore = useBookClubStore()

const friends = computed(() => friendsStore.friends.slice(0, 3))

const activeBookClubs = computed(() => {

  if (!authStore.user)
    return []

  return bookClubStore.clubs.filter(club =>
    club.members.some(
      member => member.id === authStore.user.id
    )
  )

})

function goToFriendProfile(friendId) {
  router.push(`/friends/${friendId}`)
}

const progress = computed(() => {
  if (!currentBook.value) return 0

  const totalPages = currentBook.value.totalPages || 1
  const currentPage = currentBook.value.currentPage || 0

  return Math.min(
    Math.round((currentPage / totalPages) * 100),
    100
  )
})

function goToBook(id) {
  router.push(`/product/${id}`)
}

function goToBookClub(clubId) {
  router.push(`/bookclubs/${clubId}`)
}

function saveProgress() {
  if (!currentBook.value) return

  const totalPages = currentBook.value.totalPages || 1

  if (newPage.value < 0 || newPage.value > totalPages) {
    alert('Bitte gib eine gültige Seitenzahl ein.')
    return
  }

  const oldPage = currentBook.value.currentPage || 0
  const pagesReadToday = Number(newPage.value) - oldPage

  currentBook.value.currentPage = Number(newPage.value)

  localStorage.setItem(
    'biblio-current',
    JSON.stringify(libraryStore.currentBooks)
  )

  if (pagesReadToday > 0) {
    readingLog.value.unshift({
      date: new Date().toISOString().slice(0, 10),
      pages: pagesReadToday
    })

    localStorage.setItem(
      'biblio-reading-log',
      JSON.stringify(readingLog.value)
    )
  }
}
</script>

<template>
  <main class="dashboard-page">
    <section class="dashboard-hero">
      <div>
        <p class="eyebrow">Willkommen zurück</p>
        <h1>
          Hallo,
          <span>{{ authStore.user?.name }}</span>
        </h1>
        <p>
          Tracke deinen Lesefortschritt, entdecke neue Bücher und bleib mit deiner Community verbunden.
        </p>
      </div>
    </section>

    <section class="dashboard-grid">

      <article v-if="currentBook" class="current-book-card">
        <div class="section-header">
          <div>
            <p class="eyebrow">Du liest gerade</p>
            <h2>{{ currentBook.title }}</h2>
            <p>{{ currentBook.author }}</p>
          </div>

          <button class="details-link" @click="goToBook(currentBook.id)">
            Buch ansehen
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>

        <div class="book-content">
  <img
    :src="currentBook.image"
    :alt="currentBook.title"
    @click="goToBook(currentBook.id)"
  />

  <div class="book-info">
    <div class="progress-text">
      <span>
        Seite {{ currentBook.currentPage || 0 }}
        von {{ currentBook.totalPages || 1 }}
      </span>
      <strong>{{ progress }}%</strong>
    </div>

    <div class="progress-bar">
      <div :style="{ width: progress + '%' }"></div>
    </div>

    <div class="book-preview">

      <p>
        {{
          currentBook.description?.length > 180 && !showFullDescription
            ? currentBook.description.slice(0, 180) + '...'
            : currentBook.description || 'Keine Beschreibung vorhanden.'
        }}
      </p>

      <button
        v-if="currentBook.description?.length > 180"
        class="more-link"
        @click="showFullDescription = !showFullDescription"
      >
        {{ showFullDescription ? 'Weniger anzeigen' : 'Mehr anzeigen' }}
      </button>

      <button
        class="details-btn"
        @click="goToBook(currentBook.id)"
      >
        Mehr anzeigen
        <i class="bi bi-arrow-right"></i>
      </button>
    </div>
  </div>
</div>

<div class="progress-form">
  <label>Neuen Fortschritt eintragen</label>

  <div>
    <input
      v-model.number="newPage"
      type="number"
      min="0"
      :max="currentBook.totalPages || 1"
    />

    <button @click="saveProgress">
      Speichern
    </button>
  </div>
</div>

<div
  v-if="activeBookClubs.length"
  class="bookclubs-section"
>

  <div class="section-header">

    <h3>
      Buchclubs
    </h3>

    <button
      class="details-link"
      @click="router.push('/bookclubs')"
    >
      Alle anzeigen
    </button>

  </div>

  <div
    v-for="club in activeBookClubs"
    :key="club.id"
    class="bookclub-card"
    @click="goToBookClub(club.id)"
  >

    <div>

      <strong>
        {{ club.name }}
      </strong>

      <p>
        {{ club.nextMeeting.topic }}
      </p>

    </div>

    <div class="meeting-date">
      {{ club.nextMeeting.date }}
    </div>

  </div>

</div>

</article>

      <aside class="stats-card">
        <h2>Deine Statistik</h2>

        <div class="stats-grid">
          <button @click="router.push('/library')">
            <strong>{{ libraryStore.completedBooks.length }}</strong>
            <span>Gelesen</span>
          </button>

          <button @click="router.push('/library')">
            <strong>{{ libraryStore.currentBooks.length }}</strong>
            <span>Am Lesen</span>
          </button>

          <button @click="router.push('/library')">
            <strong>{{ libraryStore.wishlistBooks.length }}</strong>
            <span>Wunschliste</span>
          </button>
        </div>

        <h3>Leselog</h3>

        <ul v-if="readingLog.length" class="reading-log">
          <li v-for="entry in readingLog" :key="entry.date + entry.pages">
            <span>{{ entry.date }}</span>
            <strong>+{{ entry.pages }} Seiten</strong>
          </li>
        </ul>

        <p v-else class="empty-log">
          Noch kein Fortschritt eingetragen.
        </p>
      </aside>

      <section class="friends-card">
        <div class="section-header">
          <h2>
            Freunde lesen
          </h2>

          <button class="details-link" @click="router.push('/friends')">
              Alle anzeigen
          </button>
        </div>

        <div class="friend-list">
        <div
          v-for="friend in friends"
          :key="friend.id"
          class="friend-item"
        >
          <i class="bi bi-person-fill"></i>

          <div>
            <strong>{{ friend.name }}</strong>

            <p>
              Liest
            <button
              class="book-title-link"
              @click="goToBook(friend.currentBook.id)"
            >
              {{ friend.currentBook.title }}
            </button>

            · {{ friend.currentBook.progress }}
            </p>

            <button
              class="friend-profile-btn"
              @click="goToFriendProfile(friend.id)"
            >
              Profil anschauen
            </button>
          </div>
        </div>
      </div>
      </section>

      <section class="recommend-card">
        <div class="section-header">
          <h2>Für dich empfohlen</h2>
          <button class="details-link" @click="router.push('/books')">
            Mehr entdecken
          </button>
        </div>

        <div class="recommend-grid">
          <div
            v-for="book in recommendedBooks"
            :key="book.id"
            class="recommend-book"
            @click="goToBook(book.id)"
          >
            <img :src="book.image" :alt="book.title" />
            <strong>{{ book.title }}</strong>
            <span>{{ book.author }}</span>
          </div>
        </div>
      </section>

    </section>
  </main>
</template>

<style scoped>
.dashboard-page {
  min-height: calc(100vh - 80px);
  background:
    radial-gradient(circle at top right, rgba(138,161,177,0.18), transparent 32%),
    var(--beige);
  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.dashboard-hero {
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

.dashboard-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(2.3rem, 5vw, 4.5rem);
  margin-bottom: 0.8rem;
}

.dashboard-hero h1 span {
  color: var(--accent);
  font-style: italic;
}

.dashboard-hero p {
  max-width: 650px;
  color: var(--text-muted);
  font-size: 1.05rem;
}

.dashboard-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.current-book-card,
.stats-card,
.friends-card,
.recommend-card {
  background: rgba(247,241,230,0.76);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 24px;
  padding: 1.6rem;
  box-shadow:
    0 12px 30px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
}

.current-book-card {
  grid-row: span 2;
}

.section-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.4rem;
}

.section-header h2 {
  font-family: Georgia, serif;
  font-size: 2rem;
  margin: 0;
}

.details-link {
  border: none;
  background: transparent;
  color: var(--accent);
  box-shadow: none;
  padding: 0;
  font-size: 0.9rem;
  cursor: pointer;
}

.book-content {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 1.8rem;
  background: #8a7a70;
  color: white;
  border-radius: 20px;
  padding: 1.4rem;
  cursor: pointer;
}

.book-content:hover {
  transform: translateY(-2px);
  transition: 0.2s ease;
}

.book-content img {
  width: 170px;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
}

.book-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}

.progress-bar {
  height: 13px;
  background: rgba(255,255,255,0.45);
  border-radius: 20px;
  overflow: hidden;
}

.progress-bar div {
  height: 100%;
  background: white;
  border-radius: 20px;
}

.hint {
  margin-top: 1rem;
  color: rgba(255,255,255,0.75);
}

.progress-form {
  margin-top: 1.3rem;
}

.progress-form label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}

.progress-form div {
  display: flex;
  gap: 0.8rem;
}

.progress-form input {
  max-width: 180px;
  border: 1px solid var(--border);
  border-radius: 50px;
  padding: 0.65rem 1rem;
}

.progress-form button,
.empty-link {
  border: none;
  border-radius: 50px;
  background: var(--accent);
  color: white;
  padding: 0.65rem 1.2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.14);
  text-decoration: none;
}

.empty-current {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.empty-current h2 {
  font-family: Georgia, serif;
}

.empty-current p,
.empty-log {
  color: var(--text-muted);
}

.empty-link {
  width: fit-content;
  margin-top: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
  margin: 1.2rem 0 1.6rem;
}

.stats-grid button {
  background: transparent;
  border: none;
  cursor: pointer;
}

.stats-grid strong {
  display: block;
  font-family: Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
}

.stats-grid span {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.reading-log {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reading-log li {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  padding: 0.8rem 0;
}

.friend-list {
  display: grid;
  gap: 0.9rem;
}

.friend-item {
  background: rgba(255,255,255,0.72);
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.friend-item:hover,
.recommend-book:hover {
  transform: translateY(-2px);
}

.friend-item i {
  width: 42px;
  height: 42px;
  background: var(--beige-dark);
  color: var(--accent);
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.friend-item p {
  margin: 0;
  color: var(--text-muted);
}

.recommend-card {
  grid-column: 1 / -1;
}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(3, 160px);
  gap: 1.5rem;
}

.recommend-book {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.recommend-grid img {
  width: 130px;
  height: 190px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.7rem;
}

.recommend-grid strong,
.recommend-grid span {
  display: block;
}

.recommend-grid span {
  color: var(--text-muted);
  font-size: 0.85rem;
}

@media (max-width: 850px) {
  .dashboard-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .book-content {
    grid-template-columns: 1fr;
  }

  .book-content img {
    width: 130px;
    height: 190px;
  }

  .recommend-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.book-preview {
  margin-top: 1.4rem;
}

.book-preview h4 {
  font-family: Georgia, serif;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.book-preview p {
  color: rgba(255,255,255,0.92);
  line-height: 1.6;
  margin-bottom: 0.6rem;
}

.more-link {
  background: none;
  border: none;
  color: rgba(255,255,255,0.8);
  padding: 0;
  cursor: pointer;
  font-size: 0.85rem;
}

.details-btn {
  display: block;
  width: fit-content;
  margin-top: 0.8rem;
  border: none;
  border-radius: 50px;
  padding: 0.55rem 1rem;
  background: white;
  color: #6f625a;
  font-size: 0.85rem;
}
.book-title-link {
  border: none;
  background: transparent;
  color: var(--accent);
  padding: 0;
  font-weight: 600;
  cursor: pointer;
}

.book-title-link:hover {
  text-decoration: underline;
}

.friend-profile-btn {
  margin-top: 0.4rem;
  border: 1px solid var(--border);
  border-radius: 50px;
  background: var(--beige-dark);
  color: var(--text-muted);
  padding: 0.3rem 0.75rem;
  font-size: 0.75rem;
}

.friend-count {
  font-size: .8rem;
  background: var(--accent);
  color: white;

  padding: .2rem .6rem;
  border-radius: 999px;
}

.bookclubs-section {
  margin-top: 2rem;

  padding-top: 1.5rem;

  border-top: 1px solid var(--border);
}

.bookclubs-section h3 {
  font-family: Georgia, serif;
  margin: 0;
}

.bookclub-card {
  margin-top: 1rem;

  background: rgba(255,255,255,.7);

  border-radius: 18px;

  padding: 1rem 1.2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  transition: .2s;
}

.bookclub-card:hover {
  transform: translateY(-2px);
}

.bookclub-card p {
  margin: .25rem 0 0;

  color: var(--text-muted);

  font-size: .9rem;
}

.meeting-date {
  color: var(--accent);

  font-weight: 600;
}
</style>