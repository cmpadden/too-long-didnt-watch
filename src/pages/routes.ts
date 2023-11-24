import {createRouter} from 'vue-router'
import Homepage from './Home.vue';
import About from './About.vue';

const routes = [
  {
    path: '/',
    component: Homepage
  },
  {
    path: '/about/',
    component: About
  }
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}
