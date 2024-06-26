import Vue from 'vue'
import VueRouter from 'vue-router'
import TheLayout from '../components/TheLayout.vue'


Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: TheLayout
    }
]

const router = new VueRouter({
    routes
})

export default router