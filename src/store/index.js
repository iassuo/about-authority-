import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'), // '[]' 防止 JSON.parse 在没数据还转换的情况下报错
        username: sessionStorage.getItem('userName')
    },
    mutations: {
        setRightList(state, data) {
            state.rightList = data;
            sessionStorage.setItem('rightList', JSON.stringify(data)); // sessionStorage 存储的是字符串，获取的数据需要转换
        },
        setUserName(state, data) {
            state.username = data;
            sessionStorage.setItem('username', data)
        }

    },
    actions: {
    },
    getters: {
    }
})
