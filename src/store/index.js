import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
// 容器中的数据一旦发生改变 绑定数据的视图就会随之更新
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER' //不仅要存还要访问 所以定义常量 方便后续使用
export default new Vuex.Store({
    state: {
        //一个对象 存储当前登录的用户信息（token等数据）
        user: getItem(TOKEN_KEY)
            // user: JSON.parse(localStorage.getItem('TOKEN_KEY')) //拿本地存储的数据
    },
    getters: {},
    mutations: {
        setUser(state, data) {
            state.user = data
            setItem(TOKEN_KEY, state.user)
                // localStorage.setItem('TOKEN_KEY', JSON.stringify(state.user)) //为了防止数据丢失，我们需要把数据备份一份到本地存储
        }
    },
    actions: {},
    modules: {}
})