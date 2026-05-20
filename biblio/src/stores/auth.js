// Einfacher Admin-Store – kein echtes Login, nur für die Demo.
// In einer echten App würde hier JWT-Token oder Session-Management stehen.
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAdmin = ref(false)

  function login(password) {
    // einfaches Passwort für Demo-Zwecke
    if (password === 'admin123') {
      isAdmin.value = true
      return true
    }
    return false
  }

  function logout() {
    isAdmin.value = false
  }

  return { isAdmin, login, logout }
})