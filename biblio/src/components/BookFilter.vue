<template>
  <div class="filter-bar d-flex gap-3 flex-wrap align-items-end mb-4">

    <div class="filter-group">
      <label class="filter-label">Suche</label>
      <div class="search-wrap">
        <i class="bi bi-search search-icon"></i>
        <input
          v-model="name"
          type="text"
          class="filter-input"
          placeholder="Titel oder Autor..."
          @input="emitFilter"
        />
      </div>
    </div>

    <div class="filter-group">
      <label class="filter-label">Kategorie</label>
      <select v-model="category" class="filter-input" @change="emitFilter">
        <option value="">Alle</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <button v-if="name || category" class="reset-btn" @click="resetFilter">
      <i class="bi bi-x-lg me-1"></i>Zurücksetzen
    </button>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['filter'])

const name = ref('')
const category = ref('')
const categories = ref([])
const router = useRouter()
const route = useRoute()

onMounted(async () => {
  try {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/books`)
    if (!response.ok) throw new Error()

    const books = await response.json()

    categories.value = [
      ...new Set(books.map(b => b.category).filter(Boolean))
    ]

  } catch {
    // Fallback
  }

  // Kategorie aus URL lesen
  if (route.query.category) {
    category.value = route.query.category
  }
})

function emitFilter() {

  router.push({
    query: {
      ...route.query,
      category: category.value || undefined
    }
  })

  emit('filter', {
    name: name.value,
    category: category.value,
  })
}

function resetFilter() {
  name.value = ''
  category.value = ''
  emitFilter()
}


</script>

<style scoped>
.filter-bar {
  background: var(--beige-dark);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.2rem 1.5rem;

}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.filter-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.filter-input {
  padding: 0.5rem 1rem 0.5rem 2.2rem;
  border: 1.5px solid var(--border);
  border-radius: 50px;
  background: var(--beige);
  color: var(--text);
  font-family: inherit;
  font-size: 0.85rem;
  outline: none;
  min-width: 200px;
}

select.filter-input { padding-left: 1rem; }
.filter-input:focus { border-color: var(--accent); }

.reset-btn {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  cursor: pointer;
  font-family: inherit;
  align-self: flex-end;
  transition: color 0.2s, border-color 0.2s;
}

.reset-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}
</style>