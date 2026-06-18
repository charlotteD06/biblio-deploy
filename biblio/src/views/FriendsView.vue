<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFriendsStore } from '../stores/friends.js'

const router = useRouter()
const friendsStore = useFriendsStore()

const friends = computed(() => friendsStore.friends)

function goToFriendProfile(friendId) {
  router.push(`/friends/${friendId}`)
}

function goToBook(bookId) {
  router.push(`/product/${bookId}`)
}
</script>

<template>
  <main class="friends-page">
    <section class="friends-hero">
      <div>
        <p class="eyebrow">Community</p>
        <h1>Meine Freunde</h1>
        <p>
          Sieh, was deine Freunde gerade lesen und öffne ihre Profile.
        </p>
      </div>
    </section>

    <section class="friends-grid">
      <article
        v-for="friend in friends"
        :key="friend.id"
        class="friend-card"
      >
        <div class="friend-top">
          <div class="avatar">
            <i class="bi bi-person-fill"></i>
          </div>

          <div>
            <h2>{{ friend.name }}</h2>
            <p>{{ friend.bio }}</p>
          </div>
        </div>

        <div class="current-book">
          <p class="label">Liest gerade</p>

          <button
            class="book-link"
            @click="goToBook(friend.currentBook.id)"
          >
            {{ friend.currentBook.title }}
          </button>

          <span>{{ friend.currentBook.progress }}</span>
        </div>

        <button
          class="profile-btn"
          @click="goToFriendProfile(friend.id)"
        >
          Profil anschauen
          <i class="bi bi-arrow-right"></i>
        </button>
      </article>
    </section>
  </main>
</template>

<style scoped>
.friends-page {
  min-height: calc(100vh - 80px);
  background:
    radial-gradient(circle at top right, rgba(138,161,177,0.16), transparent 34%),
    var(--beige);
  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.friends-hero {
  max-width: 1200px;
  margin: 0 auto 2.5rem;
}

.eyebrow {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.friends-hero h1 {
  font-family: Georgia, serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
}

.friends-hero p {
  color: var(--text-muted);
  max-width: 650px;
}

.friends-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 1.5rem;
}

.friend-card {
  background: rgba(247,241,230,0.76);
  border: 1px solid rgba(255,255,255,0.45);
  border-radius: 24px;
  padding: 1.6rem;
  box-shadow:
    0 12px 30px rgba(0,0,0,0.08),
    inset 0 1px 0 rgba(255,255,255,0.7);
  backdrop-filter: blur(10px);
}

.friend-top {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.3rem;
}

.avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--beige-dark);
  color: var(--accent);
  display: grid;
  place-items: center;
  font-size: 1.5rem;
}

.friend-card h2 {
  font-family: Georgia, serif;
  margin: 0;
}

.friend-card p {
  color: var(--text-muted);
  margin: 0;
}

.current-book {
  background: rgba(255,255,255,0.65);
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 1.2rem;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.3rem !important;
}

.book-link {
  display: block;
  border: none;
  background: transparent;
  color: var(--accent);
  padding: 0;
  font-weight: 600;
  font-size: 1rem;
}

.book-link:hover {
  text-decoration: underline;
}

.current-book span {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.profile-btn {
  border: none;
  border-radius: 50px;
  background: var(--accent);
  color: white;
  padding: 0.6rem 1.1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.14);
}
</style>