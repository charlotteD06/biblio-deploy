import { createRouter, createWebHashHistory } from 'vue-router'import ProductCatalog from '../views/ProductCatalog.vue'
import ProductDetail from '../views/ProductDetail.vue'
import CreateBook from '../views/CreateBook.vue'
import EditBook from '../views/EditBook.vue'
import FriendsView from '../views/FriendsView.vue'

import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import ImpressumView from '../views/ImpressumView.vue'
import DatenschutzView from '../views/DatenschutzView.vue'
import ContactView from '../views/ContactView.vue'
import HomeView from '../views/HomeView.vue'
import ChallengesView from '../views/ChallengesView.vue'
import RegisterView from '../views/RegisterView.vue'
import LibraryView from '../views/LibraryView.vue'
import FriendProfileView from '../views/FriendProfileView.vue'
import UsersView from '../views/UsersView.vue'
import BookClubsView from '../views/BookClubsView.vue'
import BookClubDetailView from '../views/BookClubDetailView.vue'
import CreateBookClubView from '../views/CreateBookClubView.vue'
import AdminDashboardView from '../views/AdminDashboardView.vue'
import AdminBookClubsView from '../views/AdminBookClubsView.vue'
import BooksView from '../views/BooksView.vue'

import { useAuthStore } from '../stores/auth.js'

const router = createRouter({
history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: ProductCatalog
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/book/new',
      name: 'create',
      component: CreateBook,
      meta: { requiresAdmin: true }
    },
    {
      path: '/book/:id/edit',
      name: 'edit',
      component: EditBook,
      meta: { requiresAdmin: true }
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: ImpressumView
    },
    {
      path: '/datenschutz',
      name: 'datenschutz',
      component: DatenschutzView
    },
    {
  path: '/kontakt',
  name: 'kontakt',
  component: ContactView
    },
    {
  path: '/home',
  name: 'home',
  component: HomeView,
  meta: { requiresAuth: true }
    },
    {
  path: '/challenges',
  name: 'challenges',
  component: ChallengesView,
  meta: { requiresAuth: true }
    },
    {
  path: '/register',
  name: 'register',
  component: RegisterView
    },
    {
  path: '/library',
  name: 'library',
  component: LibraryView,
  meta: { requiresAuth: true }
    },
    {
    path: '/friends/:id',
    name: 'friend-profile',
    component: FriendProfileView,
    meta: { requiresAuth: true }
    },
    {
    path: '/friends',
    name: 'friends',
    component: FriendsView,
    meta: { requiresAuth: true }
    },
    {
    path: '/users',
    component: UsersView
    },
    {
    path: '/bookclubs',
    component: BookClubsView
    },
    {
    path: '/bookclubs/:id',
    component: BookClubDetailView
    },
    {
    path: '/bookclubs/create',
    component: CreateBookClubView
   },
   {
  path: '/admin',
  component: AdminDashboardView
  },
  {
  path: '/admin/bookclubs',
  component: AdminBookClubsView
  },
  {
  path: '/books',
  name: 'books',
  component: BooksView
  },
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return '/login'
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return '/login'
  }
})

export default router