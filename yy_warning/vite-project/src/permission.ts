import router from "@/router";
import {getToken} from "@/utils/auth.ts";
import store from "@/store";

const whiteList = ['/login','register']
//路由前置守卫
router.beforeEach(async (to,from,next) => {
    const hasToken = getToken();
    console.log(from.path)
    const username=store.state.user
    if (hasToken) {
        //token存在，说明已经登录
        if (to.path === '/login') {
            next()
        }else {
            //进入页面之前，获取用户信息
            //有用户信息
            if (username){
                next()
            }else {
                await store.dispatch("user/getInfo")
                next({
                    ...to,
                    replace: true // 不保留本次进入页面的路有记录
                })
            }
        }
    }else {
        //token不存在，还没有登录
        if (whiteList.includes(to.path)){
            // 要去的页面是白名单里面的页面，直接放行
            next()
        }else {
            // 要去的页面不在白名单里面，强制跳转到登录页
            next('/login')
        }

    }
})
//路由后置守卫
router.afterEach(()=>{

})