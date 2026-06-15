<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const friends = [
  {
    id: 1,
    name: 'Alina',
    bio: 'Liest gerne Klassiker, emotionale Romane und Bücher über starke Figuren.',
    currentBook: {
      id: 2,
      title: 'Anna Karenina',
      author: 'Leo Tolstoy',
      image: 'https://covers.openlibrary.org/b/isbn/9780140449174-L.jpg',
      progress: 68
    },
    favoriteBooks: [
      {
        id: 2,
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        image: 'https://covers.openlibrary.org/b/isbn/9780140449174-L.jpg'
      },
      {
        id: 1,
        title: 'A Little Life',
        author: 'Hanya Yanagihara',
        image: 'https://covers.openlibrary.org/b/isbn/9780804172707-L.jpg'
      },
      {
        id: 3,
        title: 'The Secret History',
        author: 'Donna Tartt',
        image: 'https://covers.openlibrary.org/b/isbn/9780316055437-L.jpg'
      }
    ],
    favoriteCharacters: [
      'Anna Karenina',
      'Jude St. Francis',
      'Willem Ragnarsson'
    ]
  },
  {
    id: 2,
    name: 'Paul',
    bio: 'Mag Kafka, kurze philosophische Romane und Bücher, die zum Nachdenken bringen.',
    currentBook: {
      id: 5,
      title: 'Der Prozess',
      author: 'Franz Kafka',
      image: 'https://covers.openlibrary.org/b/isbn/9783150009675-L.jpg',
      progress: 100
    },
    favoriteBooks: [
      {
        id: 5,
        title: 'Der Prozess',
        author: 'Franz Kafka',
        image: 'https://covers.openlibrary.org/b/isbn/9783150009675-L.jpg'
      },
      {
        id: 6,
        title: 'Der kleine Prinz',
        author: 'Antoine de Saint-Exupéry',
        image: 'https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg'
      },
      {
        id: 3,
        title: 'The Secret History',
        author: 'Donna Tartt',
        image: 'https://covers.openlibrary.org/b/isbn/9780316055437-L.jpg'
      }
    ],
    favoriteCharacters: [
      'Josef K.',
      'Der kleine Prinz',
      'Donna Tartt'
    ]
  }
]

const friend = computed(() =>
  friends.find(f => f.id === Number(route.params.id))
)

function goToBook(id) {
  router.push(`/product/${id}`)
}
</script>

<template>
  <main class="friend-profile-page" v-if="friend">

    <section class="friend-hero">
      <button class="back-link" @click="router.back()">
        <i class="bi bi-arrow-left"></i>
        Zurück
      </button>

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
        <div>
          <p class="eyebrow">Liest gerade</p>
          <h2>{{ friend.currentBook.title }}</h2>
          <p>{{ friend.currentBook.author }}</p>
        </div>

        <div class="current-reading-content" @click="goToBook(friend.currentBook.id)">
          <img :src="friend.currentBook.image" :alt="friend.currentBook.title" />

          <div class="reading-info">
            <strong>{{ friend.currentBook.progress }}%</strong>

            <div class="progress-bar">
              <div :style="{ width: friend.currentBook.progress + '%' }"></div>
            </div>

            <span>Zur Buchseite</span>
          </div>
        </div>
      </article>

      <article class="profile-card books-card">
        <div class="section-header">
          <h2>Lieblingsbücher</h2>
        </div>

        <div class="favorite-books">
          <div
            v-for="book in friend.favoriteBooks"
            :key="book.id"
            class="book-item"
            @click="goToBook(book.id)"
          >
            <img :src="book.image" :alt="book.title" />
            <strong>{{ book.title }}</strong>
            <span>{{ book.author }}</span>
          </div>
        </div>
      </article>

      <article class="profile-card characters-card">
        <h2>Lieblingscharaktere</h2>

        <div class="character-tags">
          <span
            v-for="character in friend.favoriteCharacters"
            :key="character"
          >
            {{ character }}
          </span>
        </div>
      </article>

    </section>

  </main>

  <main v-else class="friend-profile-page">
    <section class="profile-card">
      <h1>Profil nicht gefunden</h1>
      <button class="back-link" @click="router.back()">Zurück</button>
    </section>
  </main>
</template>

<style scoped>
.friend-profile-page {
  min-height: calc(100vh - 80px);
  background:
    radial-gradient(circle at top right, rgba(138,161,177,0.16), transparent 34%),
    var(--beige);
  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.friend-hero {
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 1.5rem;
}

.back-link {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
}

.friend-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--beige-dark);
  color: var(--accent);
  display: grid;
  place-items: center;
  font-size: 2.5rem;
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  margin-bottom: 0.4rem;
}

.friend-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(2.3rem, 5vw, 4rem);
  margin-bottom: 0.4rem;
}

.friend-hero p {
  color: var(--text-muted);
  max-width: 650px;
}

.friend-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.3fr 2fr;
  gap: 1.5rem;
}

.profile-card {
  background: rgba(247,241,230,0.76);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 24px;
  padding: 1.6rem;
  box-shadow:
    0 12px 30px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
}

.profile-card h2 {
  font-family: Georgia, serif;
  margin-bottom: 1.2rem;
}

.current-reading-card {
  grid-row: span 2;
}

.current-reading-content {
  background: #8a7a70;
  border-radius: 18px;
  padding: 1.2rem;
  color: white;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1.2rem;
  cursor: pointer;
}

.current-reading-content img {
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}

.reading-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.reading-info strong {
  font-size: 2rem;
  font-family: Georgia, serif;
}

.progress-bar {
  height: 12px;
  background: rgba(255,255,255,0.45);
  border-radius: 20px;
  overflow: hidden;
  margin: 0.8rem 0;
}

.progress-bar div {
  height: 100%;
  background: white;
  border-radius: 20px;
}

.reading-info span {
  color: rgba(255,255,255,0.8);
  font-size: 0.85rem;
}

.favorite-books {
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
}

.book-item {
  width: 125px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.book-item:hover {
  transform: translateY(-3px);
}

.book-item img {
  width: 105px;
  height: 155px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(0,0,0,0.14);
}

.book-item strong,
.book-item span {
  display: block;
  font-size: 0.85rem;
}

.book-item span {
  color: var(--text-muted);
}

.characters-card {
  grid-column: 2;
}

.character-tags {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.character-tags span {
  background: var(--accent);
  color: #1e2a30;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  box-shadow: 0 3px 8px rgba(0,0,0,0.12);
}

@media (max-width: 850px) {
  .friend-hero {
    grid-template-columns: 1fr;
  }

  .friend-grid {
    grid-template-columns: 1fr;
  }

  .current-reading-card,
  .characters-card {
    grid-column: auto;
    grid-row: auto;
  }

  .current-reading-content {
    grid-template-columns: 1fr;
  }
}
</style>