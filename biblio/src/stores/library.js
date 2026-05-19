import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLibraryStore = defineStore('library', () => {

  const currentBooks = ref([])
  const completedBooks = ref([])
  const wishlistBooks = ref([])

   const addToWishlist = (book) => {

    // prüfen ob Buch schon existiert
    const exists =
      wishlistBooks.value.some(b => b.id === book.id)

    if (!exists) {
      wishlistBooks.value.push(book)
    }
  }

  const addToCurrent = (book) => {
    currentBooks.value.push(book)
  }

  const addToCompleted = (book) => {
    completedBooks.value.push(book)
  }

  return {
    currentBooks,
    completedBooks,
    wishlistBooks,
    addToWishlist,
    addToCurrent,
    addToCompleted
  }
})