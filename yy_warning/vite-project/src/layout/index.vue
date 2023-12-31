<template>
  <div class='app-wrapper' :class='classObj'>
    <div v-if="device === 'mobile' && opened" class='drawer-bg' @click='handleClickOutside' />
    <!--侧边栏-->
    <Sidebar />
    <!--主体内容-->
    <div class='main-container'>
      <!--顶部导航-->
      <HeaderBar />
      <!--主页面-->
      <AppMain />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed, watch, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import HeaderBar from './components/HeaderBar.vue'

const route = useRoute()
const mobileWidth = ref(992)

const opened = computed(() => store.state.app.sidebar.opened)
const withoutAnimation = computed(() => store.state.app.sidebar.withoutAnimation)
const device = computed(() => store.state.app.device)
const classObj = computed(() => {
  return {
    hideSidebar: !opened.value,
    openSidebar: opened.value,
    withoutAnimation: withoutAnimation.value,
    mobile: device.value === 'mobile'
  }
})

watch(route, () => {
  if (device.value === 'mobile' && opened.value) {
    store.dispatch('app/closeSideBar', false)
  }
})

onBeforeMount(() => {
  window.addEventListener('resize', resizeHandler)
})

onMounted(() => {
  const isMob = isMobile()
  if (isMob) {
    store.dispatch('app/toggleDevice', 'mobile')
    store.dispatch('app/closeSideBar', true)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

const handleClickOutside = () => {
  store.dispatch('app/closeSideBar', false)
}

const isMobile = (): boolean => {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < mobileWidth.value
}

const resizeHandler = () => {
  if (!document.hidden) {
    const isMob = isMobile()
    store.dispatch('app/toggleDevice', isMob ? 'mobile' : 'desktop')

    if (isMob) {
      store.dispatch('app/closeSideBar', true)
    }
  }
}
</script>

<style lang='scss' scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

  .main-container {
    position: relative;
    min-height: 100%;
    margin-left: 200px;
    transition: margin-left 0.28s;
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
  }
}
</style>
