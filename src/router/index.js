import { createRouter, createWebHashHistory } from 'vue-router'

import CityListView from '@/views/Cities/CityListView.vue'
import CitySpotsView from '@/views/Cities/CitySpotsView.vue'
import SpotDetailView from '@/views/Cities/SpotDetailView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/cities'
    },
    {
      path: '/cities',
      name: 'city-list',
      component: CityListView
    },
    {
      path: '/cities/:city',
      name: 'city-spots',
      component: CitySpotsView
    },
    {
      path: '/cities/:city/spots/:id',
      name: 'spot-detail',
      component: SpotDetailView
    },
    
  ],
})

export default router
