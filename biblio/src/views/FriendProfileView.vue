<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFriendsStore } from '../stores/friends.js'
import { characters } from '../stores/characters'

const route = useRoute()
const router = useRouter()
const friendsStore = useFriendsStore()

const books = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/api/books')
    books.value = await response.json()
  } catch (err) {
    console.error(err)
  }
})

const friend = computed(() => {

  return (
    friendsStore.friends.find(
      f => f.id === Number(route.params.id)
    ) ||

    friendsStore.allUsers.find(
      f => f.id === Number(route.params.id)
    )
  )
})

const currentBookData = computed(() =>
  books.value.find(
    b => b.id === friend.value?.currentBook.id
  )
)

const selectedCharacter = ref(null)

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
  <main class="friend-profile-page" v-if="friend">

    <button class="back-link" @click="router.back()">
      <i class="bi bi-arrow-left"></i>
      Zurück
    </button>

    <section class="friend-hero">

      <div class="friend-avatar">
        <i class="bi bi-person-fill"></i>
      </div>

      <div>
        <p class="eyebrow">Freundesprofil</p>
        <h1>{{ friend.name }}</h1>
        <p>{{ friend.bio }}</p>
      </div>

    </section>

    <section class="friend-grid">

      <article class="profile-card current-reading-card">

        <p class="eyebrow">Liest gerade</p>

        <h2>
          {{ currentBookData?.title || friend.currentBook.title }}
        </h2>

        <p class="author">
          {{ currentBookData?.author || friend.currentBook.author }}
        </p>

        <div class="current-reading-content">

          <img
            :src="currentBookData?.image || friend.currentBook.image"
            :alt="currentBookData?.title"
            class="current-book-cover"
          >

          <div class="reading-info">

            <div class="progress-header">
              <span>Lesefortschritt</span>
              <strong>{{ friend.currentBook.progress }}%</strong>
            </div>

            <div class="progress-bar">
              <div
                :style="{
                  width: friend.currentBook.progress + '%'
                }"
              ></div>
            </div>

            <p class="current-book-description">
              {{ currentBookData?.description }}
            </p>

            <button
              class="book-page-btn"
              @click="goToBook(friend.currentBook.id)"
            >
              Zum Buch
              <i class="bi bi-arrow-right"></i>
            </button>

          </div>

        </div>

      </article>

      <article class="profile-card books-card">

        <h2>Lieblingsbücher</h2>

        <div class="favorite-books">

          <div
            v-for="book in friend.favoriteBooks"
            :key="book.id"
            class="book-item"
            @click="goToBook(book.id)"
          >
            <img
              :src="book.image"
              :alt="book.title"
            >

            <strong>{{ book.title }}</strong>
            <span>{{ book.author }}</span>

          </div>

        </div>

      </article>

      <article class="profile-card characters-card">

        <h2>Lieblingscharaktere</h2>

        <div class="character-tags">

        <button
          v-for="character in friend.favoriteCharacters"
          :key="character"
          class="character-chip"
          @click="showCharacter(character)"
        >
          {{ character }}
        </button>

        </div>

      </article>

    </section>
    <div
        v-if="selectedCharacter"
        class="character-modal-backdrop"
        @click="selectedCharacter = null"
      >

        <div
          class="character-modal"
          @click.stop
        >
          <h2>{{ selectedCharacter.book }}</h2>

          <p>
            {{ selectedCharacter.description }}
          </p>

          <button
            class="close-btn"
            @click="selectedCharacter = null"
          >
            Schließen
          </button>
        </div>

      </div>

  </main>
</template>

<style scoped>
.friend-profile-page {
  min-height: calc(100vh - 80px);
  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.back-link {
  border: none;
  background: none;
  color: var(--text-muted);
  margin-bottom: 2rem;
  cursor: pointer;

  display: inline-flex;
  gap: .5rem;
  align-items: center;
}

.friend-hero {
  max-width: 1200px;
  margin: auto auto 2rem;

  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.friend-avatar {
  width: 100px;
  height: 100px;

  min-width: 100px;
  min-height: 100px;

  flex-shrink: 0;

  border-radius: 50%;

  background: var(--beige-dark);

  display: grid;
  place-items: center;

  font-size: 2.5rem;
  color: var(--accent);
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: .08em;
  font-size: .8rem;
}

.friend-hero h1 {
  font-family: Georgia, serif;
  font-size: 3rem;
}

.friend-grid {
  max-width: 1200px;
  margin: auto;

  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
}

.profile-card {
  background: rgba(247,241,230,.85);

  border-radius: 24px;
  padding: 1.6rem;

  border: 1px solid rgba(255,255,255,.4);

  box-shadow:
    0 10px 24px rgba(0,0,0,.08);
}

.profile-card h2 {
  font-family: Georgia, serif;
}

.author {
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.current-reading-card {
  grid-row: span 2;
}

.current-reading-content {
  background: #8a7a70;

  border-radius: 18px;

  padding: 1.5rem;

  display: flex;
  gap: 1.5rem;

  color: white;
}

.current-book-cover {
  width: 140px;
  height: 210px;

  object-fit: cover;

  border-radius: 10px;

  flex-shrink: 0;
}

.reading-info {
  flex: 1;

  display: flex;
  flex-direction: column;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-header strong {
  font-size: 2rem;
  font-family: Georgia, serif;
}

.progress-bar {
  height: 12px;
  border-radius: 999px;
  overflow: hidden;

  margin: .8rem 0;

  background: rgba(255,255,255,.25);
}

.progress-bar div {
  height: 100%;
  background: white;
}

.current-book-description {
  line-height: 1.7;

  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.book-page-btn {
  margin-top: auto;

  border: none;
  border-radius: 999px;

  background: white;
  color: #6f625a;

  padding: .7rem 1rem;

  width: fit-content;
}

.favorite-books {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.book-item {
  width: 120px;
  cursor: pointer;
}

.book-item img {
  width: 100%;
  height: 170px;

  object-fit: cover;

  border-radius: 8px;
}

.book-item strong,
.book-item span {
  display: block;
  font-size: .85rem;
}

.book-item span {
  color: var(--text-muted);
}

.characters-card {
  grid-column: 2;
}

.character-tags {
  display: flex;
  flex-wrap: wrap;
  gap: .8rem;
}

.character-tags span {
  background: var(--accent);
  padding: .5rem 1rem;
  border-radius: 999px;
}

.character-chip {
  border: none;
  background: var(--accent);

  padding: .5rem 1rem;
  border-radius: 999px;

  cursor: pointer;

  transition: .2s;
}

.character-chip:hover {
  transform: translateY(-2px);
}

.character-modal-backdrop {
  position: fixed;
  inset: 0;

  background: rgba(0,0,0,.4);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
}

.character-modal {
  background: var(--beige);

  max-width: 500px;
  width: 90%;

  padding: 2rem;
  border-radius: 20px;
}

.character-modal h2 {
  font-family: Georgia, serif;
  margin-bottom: 1rem;
}

.close-btn {
  margin-top: 1rem;

  border: none;
  border-radius: 999px;

  padding: .6rem 1rem;

  background: var(--accent);
}

@media (max-width: 900px) {

  .friend-grid {
    grid-template-columns: 1fr;
  }

  .characters-card {
    grid-column: auto;
  }

  .current-reading-card {
    grid-row: auto;
  }

  .current-reading-content {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 1.2rem;
  }

  .current-book-cover {
    width: 120px;
    height: 180px;
  }
}
</style>