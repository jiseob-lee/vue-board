import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PizzasView from '../views/PizzasView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import BoardView from '../views/BoardView.vue'
import ListVue from '../components/list.vue'
import BoardViewVue from '../components/BoardView.vue'
import BoardEditVue from '../components/BoardEdit.vue'
import BoardNewVue from '../components/BoardNew.vue'
import ChildComponentA from '../components/ChildComponentA.vue'
import HelloWorld from '../components/HelloWorld.vue'
import LHeader from '../components/LHeader.vue'
//import PizzasView from '../views/PizzasView.vue'

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
    children: [
      {
        path: '',
        name: 'board',
        component: ListVue,
      },
      {
        path: 'view/:articleId/:boardNo/:page',
        name: 'boardView',
        component: BoardViewVue,
      },
      {
        path: 'edit/:articleId/:boardNo/:page',
        name: 'boardEdit',
        component: BoardEditVue,
      },
      {
        path: 'new/:boardNo/:page',
        name: 'boardNew',
        component: BoardNewVue,
      },
      {
        path: ":boardNo/:page",
        name: "board1",
        component: ListVue,
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: ChildComponentA,
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: LHeader,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

//export default router
