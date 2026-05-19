<template>
  <div class="container py-4" v-if="book">

    <!-- Back -->
    <router-link to="/" class="btn btn-light mb-3">
      ← Zurück
    </router-link>

    <div class="row g-4">

      <!-- Cover -->
      <div class="col-md-4">
        <img :src="book.image" class="img-fluid rounded shadow" />
      </div>

      <!-- Info -->
      <div class="col-md-8">

        <h2>{{ book.title }}</h2>
        <p class="text-muted">{{ book.author }}</p>

        <p class="mt-3">{{ book.description }}</p>

        <button class="btn btn-dark mt-2">
          + Zur Bibliothek hinzufügen
        </button>

      </div>
    </div>

    <!-- COMMENTS -->
    <hr class="my-5" />

    <h4>Kommentare</h4>

    <!-- Liste -->
    <div v-if="comments.length > 0">
      <div
        v-for="(c, index) in comments"
        :key="index"
        class="card p-3 mb-2"
      >
        <strong>{{ c.name }}</strong>
        <p class="mb-1">{{ c.text }}</p>
      </div>
    </div>

    <p v-else class="text-muted">
      Noch keine Kommentare
    </p>

    <!-- Input -->
    <div class="mt-3">

      <input
        v-model="newComment"
        class="form-control mb-2"
        placeholder="Schreibe einen Kommentar..."
      />

      <button
        class="btn btn-primary"
        @click="addComment"
      >
        Absenden
      </button>

    </div>

  </div>

  <div v-else class="container py-5">
    <p>Buch nicht gefunden</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { books } from '../data.js'

const route = useRoute()

const book = computed(() =>
  books.find(b => b.id === Number(route.params.id))
)

/* COMMENTS STATE */
const comments = ref([
  {
    name: "Anna Müller",
    text: "Mega gutes Buch, hat mich echt mitgenommen!"
  }
])

const newComment = ref("")

const addComment = () => {
  if (!newComment.value.trim()) return

  comments.value.push({
    name: "Gast",
    text: newComment.value
  })

  newComment.value = ""
}
</script>