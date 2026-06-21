import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('biblioUser')) || null
  }),

  getters: {
    isLoggedIn: (state) => state.user !== null,
    isAdmin: (state) => state.user?.role === 'ADMIN',
    isUser: (state) => state.user?.role === 'USER'
  },

  actions: {
        login(email, password) {
      if (email === 'admin@biblio.de' && password === 'admin') {
        this.user = {
          name: 'Admin',
          email: 'admin@biblio.de',
          role: 'ADMIN',
          bio: 'Ich verwalte die Biblio-Plattform.',
          profileImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400'
        }

        localStorage.setItem('biblioUser', JSON.stringify(this.user))
        return true
      }

      if (email === 'lisa@biblio.de' && password === 'user') {
        this.user = {
          name: 'Lisa',
          email: 'lisa@biblio.de',
          role: 'USER',
          bio: 'Bücher sind für mich der perfekte Ausgleich.',
          profileImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400'
        }

        localStorage.setItem('biblioUser', JSON.stringify(this.user))
        return true
      }

      return false
    },

    logout() {
      this.user = null
      localStorage.removeItem('biblioUser')
    },

    updateUser(updatedUser) {
      this.user = { ...this.user, ...updatedUser }
      localStorage.setItem('biblioUser', JSON.stringify(this.user))
    }
  }
})