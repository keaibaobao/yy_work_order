import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
export const constantRoutes: Array<RouteRecordRaw>=[
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: { title: '登录' },
    },
    //重定向
    {
        path:'/',
        redirect:'/login'
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
            title: '404'
        }
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401.vue'),
        meta: {
            title: '401'
        }
    },
    {
        path: '/news_summary',
        component: () => import('@/views/news_summary/index.vue'),
        meta: {title: '消息汇总'}
    },
    {
        path: '/home',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'Home',
                meta: {title: '首页', icon: 'shouye', affix: true,isShow:true}
            },
            {
                path: '/setting',
                component: () => import('@/views/setting/setting.vue'),
                name: 'Setting',
                meta: {title: '设置', icon: 'setting',isShow:true}
            },
            {
                path: '/todo_list',
                component: () => import('@/views/todo_list/index.vue'),
                name: 'TodoList',
                meta: {title: '工单一览', icon: 'setting',isShow:true}
            },
            {
                path: '/Xueyue',
                component: () => import('@/views/xueyue/index.vue'),
                name: 'Xueyue',
                meta: {title: '雪月', icon: 'shouye', roles: ['admin1'],isShow:false}
            },

            {
                path: '/work_detail',
                component: () => import('@/views/work_detail/index.vue'),
                name: 'workDetail',
                meta: {title: '工单详情页', icon: 'shouye',isShow:false, roles: ['admin1']}
            },
        ]
    }]
    export const router=createRouter({
        history: createWebHashHistory(),
        routes:constantRoutes
    })
export default router