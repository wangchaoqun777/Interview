import {createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions} from 'vue-router'
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        redirect: '/login',
        component: () => import('../views/components/Layout/View.vue'),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('../views/login/index.vue'),
            }
        ]
    }
]

const router = createRouter(<RouterOptions>{
    history: createWebHashHistory(),
    routes
})

export default router
