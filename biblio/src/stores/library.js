import { defineStore } from 'pinia'

export const useLibraryStore = defineStore('library', {
  state: () => ({
    currentBooks: JSON.parse(localStorage.getItem('biblio-current')) || [],
    completedBooks: JSON.parse(localStorage.getItem('biblio-completed')) || [],
    wishlistBooks: JSON.parse(localStorage.getItem('biblio-wishlist')) || []
  }),

  actions: {
    save() {
      localStorage.setItem('biblio-current', JSON.stringify(this.currentBooks))
      localStorage.setItem('biblio-completed', JSON.stringify(this.completedBooks))
      localStorage.setItem('biblio-wishlist', JSON.stringify(this.wishlistBooks))
    },

    removeFromAll(bookId) {
      this.currentBooks = this.currentBooks.filter(book => book.id !== bookId)
      this.completedBooks = this.completedBooks.filter(book => book.id !== bookId)
      this.wishlistBooks = this.wishlistBooks.filter(book => book.id !== bookId)
      this.save()
    },

    addToCurrent(book) {
      this.removeFromAll(book.id)
      this.currentBooks.push(book)
      this.save()
    },

    addToCompleted(book) {
      this.removeFromAll(book.id)
      this.completedBooks.push(book)
      this.save()
    },

    addToWishlist(book) {
      this.removeFromAll(book.id)
      this.wishlistBooks.push(book)
      this.save()
    },

    removeBook(bookId) {
      this.removeFromAll(bookId)
    }
  }
})