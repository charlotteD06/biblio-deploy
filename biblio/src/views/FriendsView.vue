<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFriendsStore } from '../stores/friends.js'

const router = useRouter()
const friendsStore = useFriendsStore()

const friends = computed(() => friendsStore.friends)

const showToast = ref(false)
const toastMessage = ref('')

function goToFriendProfile(friendId) {
  router.push(`/friends/${friendId}`)
}

function goToBook(bookId) {
  router.push(`/product/${bookId}`)
}

function removeFriend(friendId) {

  friendsStore.removeFriend(friendId)

  toastMessage.value = 'Freund erfolgreich entfernt'
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

</script>

<template>
  <main class="friends-page">

      <router-link
      to=""
      class="back-link mb-4 d-inline-flex align-items-center gap-2"
      @click="$router.back()"
    >
      <i class="bi bi-arrow-left"></i>
      Zurück
    </router-link>

    <section class="friends-hero">

      <div class="hero-content">

        <div>
          <p class="eyebrow">Community</p>

          <h1>Meine Freunde</h1>

          <p>
            Sieh, was deine Freunde gerade lesen und entdecke neue Leserinnen und Leser.
          </p>
        </div>

        <button
          class="add-friend-btn"
          @click="router.push('/users')"
        >
          <i class="bi bi-person-plus"></i>
          Freunde hinzufügen
        </button>

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

          <p class="label">
            Liest gerade
          </p>

          <button
            class="book-link"
            @click="goToBook(friend.currentBook.id)"
          >
            {{ friend.currentBook.title }}
          </button>

          <span>
            S. {{ friend.currentBook.progress }}
          </span>

        </div>

        <div class="friend-actions">

          <button
            class="profile-btn"
            @click="goToFriendProfile(friend.id)"
          >
            Profil anschauen
            <i class="bi bi-arrow-right"></i>
          </button>

          <button
            class="remove-btn"
            @click="removeFriend(friend.id)"
          >
            <i class="bi bi-person-dash"></i>
            Entfernen
          </button>

        </div>

      </article>

    </section>
      <div
        v-if="showToast"
        class="toast-notification"
      >
        <i class="bi bi-check-circle"></i>
        {{ toastMessage }}
      </div>
  </main>
</template>

<style scoped>
.friends-page {
  min-height: calc(100vh - 80px);
  background:
    radial-gradient(
      circle at top right,
      rgba(138,161,177,0.16),
      transparent 34%
    ),
    var(--beige);

  padding: 3rem clamp(1.5rem, 6vw, 6rem);
}

.friends-hero {
  max-width: 1200px;
  margin: 0 auto 2.5rem;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
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
  margin-bottom: .5rem;
}

.friends-hero p {
  color: var(--text-muted);
  max-width: 650px;
}

.add-friend-btn {
  border: 1px solid var(--border);

  border-radius: 999px;

  padding: .7rem 1rem;

  background: rgba(255,255,255,.65);

  color: var(--heading);

  display: flex;
  align-items: center;
  gap: .5rem;

  cursor: pointer;

  transition: .2s;
}

.add-friend-btn:hover {
  background: white;
}

.friends-grid {
  max-width: 1200px;
  margin: auto;

  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(330px, 1fr));

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

  flex-shrink: 0;
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

  cursor: pointer;
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

  padding: 0.65rem 1.2rem;

  display: inline-flex;
  align-items: center;
  gap: .5rem;

  cursor: pointer;

  box-shadow: 0 4px 12px rgba(0,0,0,0.14);
}

.profile-btn:hover {
  opacity: .92;
}

.friend-actions {
  display: flex;
  gap: .75rem;
  flex-wrap: wrap;
}

.remove-btn {
  border: none;

  border-radius: 50px;

  padding: 0.65rem 1rem;

  background: rgba(189, 98, 98, 0.12);

  color: #b45a5a;

  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: .4rem;

  transition: .2s;
}

.remove-btn:hover {
  background: rgba(189, 98, 98, 0.2);
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

@media (max-width: 768px) {

  .hero-content {
    flex-direction: column;
  }

  .add-friend-btn {
    width: fit-content;
  }
}

.toast-notification {
  position: fixed;

  bottom: 30px;
  right: 30px;

  background: #198754;
  color: white;

  padding: .9rem 1.2rem;

  border-radius: 14px;

  display: flex;
  align-items: center;
  gap: .5rem;

  z-index: 9999;

  box-shadow: 0 8px 20px rgba(0,0,0,.15);
}
</style>