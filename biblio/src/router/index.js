import { createRouter, createWebHistory } from 'vue-router'
import ProductCatalog from '../views/ProductCatalog.vue'
import ProductDetail from '../views/ProductDetail.vue'

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
    }
  ]
})

export default router