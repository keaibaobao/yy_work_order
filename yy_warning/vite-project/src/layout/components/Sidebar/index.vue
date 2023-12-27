<template>
  <div class='sidebar-container'>
    <!--项目logo-->
    <div class='logo' @click="$router.push('/')">
      <transition name='fade-transform' mode='out-in'>
        <div class='flex-center'>
          <img class='logo-img' src='/img/szhtLogo.png' alt='logo' />
        </div>
      </transition>
    </div>
    <!--导航菜单-->
    <el-menu
        :router='true'
        class='v-enter-to'
        :default-active='$route.path'
        :show-timeout='200'
        text-color='#fff'
        background-color='#006590'
        active-text-color='#FFF'
    >
    <!--引入子组件-->
      <SidebarItem :routerList="routerList"></SidebarItem>
    </el-menu>
    <BottomAvatar class='bottom-avatar' />
  </div>
</template>

<script lang='ts' setup>
//拿到路由表，过滤不想要的
import {useRouter} from "vue-router";
import SidebarItem from "@/layout/components/Sidebar/SidebarItem.vue";
import BottomAvatar from "@/layout/components/BottomAvatar.vue";
const router=useRouter()
const routerList=router.getRoutes().filter((v)=>v.meta && v.meta.isShow)

</script>

<style lang='scss' scoped='scoped'>
.bottom-avatar {
  position: absolute;
  bottom: 0;
}

.logo {
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  height: 64px; // 与 sidebar 的.sidebar-container 搭配使用， 高度相等 renhao
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  background-color: #006590;
  justify-content: center;
  align-items: center;

  .logo-img {
    width: 122px;
    height: 28px;
  }

  .logo-text {
    display: inline-block;
    height: 50px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
