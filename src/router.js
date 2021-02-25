import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import NotFound from '@/components/NotFound.vue'
import store from '@/store'

Vue.use(Router)

const userRole = { path: '/users', component: Users }
const roleRole = { path: '/roles', component: Roles }
const goodsRole = { path: '/goods', component: GoodsList }
const categoriesRole = { path: '/categories', component: GoodsCate }

// 路由规则和字符串的映射关系 字符串来自 rightList
const ruleMapping = {
    'users': userRole,
    'roles': roleRole,
    'goods': goodsRole,
    'categories': categoriesRole
}

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                // { path: '/users', component: Users },
                // { path: '/roles', component: Roles },
                // { path: '/goods', component: GoodsList },
                // { path: '/categories', component: GoodsCate }
            ]
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next()
    } else {
        const token = sessionStorage.getItem('token')
        if (!token) {
            next('/token')
        } else {
            next()
        }
    }
    next()// next 是否放行
})

export function initDynamicRoutes() {
    // 根据二级权限对路由规则进行动态添加
    const currentRoutes = router.options.routes
    const rightList = store.state.rightList
    rightList.forEach(item => {
        item.children.forEach(item => {
            // item 二级权限
            const temp = ruleMapping[item.path]
            temp.meta = item.rights // 把权限赋值给路由权限的元数据 meta
            currentRoutes[2].children.push(temp)
        })
    })
    // 将更改后的结果重新设置给 router 对象
    router.addRoutes(currentRoutes)
}

export default router
