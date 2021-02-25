import Vue from 'vue'
import router from '@/router.js'
Vue.directive('permission', {
    inserted(el, binding) {
        // console.log(el)
        // console.log(binding)
        const action = binding.value.action
        const effect = binding.value.effect
        // 判断当前路由所对应的组件中，如何判断用户是否具备 action 的权限
        console.log(router.currentRoute.meta) // currentRoute 当前组件的路由规则
        if (router.currentRoute.meta.indexOf(action) == -1) {
            if (effect === 'disabled') {
                el.disabled = true
                el.classList.add('is-disabled') // element-ui 的要求
            } else {
                el.parentNode.removeChild(el)
            }
        }
    }
})