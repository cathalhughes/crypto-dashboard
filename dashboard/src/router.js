import Router from 'vue-router'

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./components/pages/dashboard/dashboard.vue')
    },
    // {
    //   path: '/view/:symbol',
    //   name: 'infoview',
    //   component: () => import('./views/InfoView.vue'),
    //   props: true
    // }
    {
      path: '/hodl',
      name: 'hodlview',
      component: () => import('./components/pages/hodl/hodl-dashboard.vue'),
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router;