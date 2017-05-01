import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from './views/Post.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'post',
    path: '/posts/:slug',
    component: Post,
    meta: {
      test: 'sample'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
