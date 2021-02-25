import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from '@/router.js'
// 配置请求的跟路径, 目前用mock模拟数据, 所以暂时把这一项注释起来
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 请求方式和权限的映射关系
const actionMapping = {
    'get': 'view',
    'post': 'add',
    'put': 'edit',
    'delete': 'delete'
}
axios.interceptors.request.use((req) => { // 对请求拦截器进行配置 使用 use 函数, 参数是请求对象 reqs
    console.log(req.url)
    console.log(req.method)
    if (req.url !== 'login') {
        // 不是登录请求，我们应该在请求头中加入 token 数据
        req.headers.Authorization = sessionStorage.getItem('token')
        const action = actionMapping[req.method] // 从请求方式和权限映射关系中得到的权限
        const currentRight = router.currentRoute.meta // 得到当前路由的权限
        if (currentRight && currentRight.indexOf(action) === -1) {
            alert('没有权限')
            return Promise.reject(new Error('没有权限'))
        }
        // 判断非权限范围内的请求
        // router.currentRoute.meta // 得到当前路由规则中的权限数据
        // add view edit delete
        // 判断当前请求的行为
        // restful 风格请求 get -> view   post -> add  put -> edit  delete -> delete  
    }
    return req
})

// 响应拦截
axios.interceptors.response.use((res) => {
    if (res.data.meta.status === 401) {
        router.push('/login')
        sessionStorage.clear()
        window.location.reload() // 清空 vuex 中的数据
    }
    return res
})
Vue.prototype.$http = axios