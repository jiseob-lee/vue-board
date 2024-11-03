import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PizzasView from '../views/PizzasView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import BoardView from '../views/BoardView.vue'
import ListVue from '../components/list.vue'
import BoardViewVue from '../components/BoardView.vue'
import ChildComponent from '../components/ChildComponent.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/pizzas',
    name: 'pizzas',
    component: PizzasView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/board',
    name: 'board',
    component: HelloWorld,
    children: [
      {
        path: 'view/:articleId/:boardNo/:page',
        name: 'boardView',
        component: BoardViewVue,
      },
      {
        path: ":boardNo/:page",
        name: "board1",
        component: ChildComponent,
      },
    ]
  },
  {
    path: '/board/view1/:articleId/:boardNo/:page',
    name: 'boardView1',
    component: BoardViewVue,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

//export default router
