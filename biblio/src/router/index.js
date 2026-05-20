import { createRouter, createWebHistory } from 'vue-router'
import ProductCatalog from '../views/ProductCatalog.vue'
import ProductDetail from '../views/ProductDetail.vue'
import CreateBook from '../views/CreateBook.vue'
import EditBook from '../views/EditBook.vue'

const router = createRouter({
  history: createWebHistory('/'),
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
    { path: '/book/new', 
      name: 'create', 
      component: CreateBook }, 
    { path: '/book/:id/edit', 
      name: 'edit', 
      component: EditBook },
  ]
})

export default router