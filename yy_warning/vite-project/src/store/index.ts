import app from './modules/app'
import user from './modules/user'
import tagsView from "./modules/tagsView";
import {createStore} from "vuex";
export default createStore({
    // 注册模块
    modules: {
        app,
        user,
        tagsView
    },
})

