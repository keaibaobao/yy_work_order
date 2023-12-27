<template>
  <template v-for="item in props.routerList" :key="item.path">
    <!-- 当该菜单项有子菜单时 -->
    <el-sub-menu :index="item.path" v-if="item.children  && item.children.length > 0">
      <template #title v-if="item.meta.icon">
        <!-- 菜单项图标 -->
        <el-icon style="width: 30px;height: 30px"><svg-icon :icon-class="item.meta.icon" /></el-icon>
        <!-- 菜单项名称，在路由中定义好 -->
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 若路由中未定义菜单项icon，则仅展示名称---->
      <template #title v-else>{{ item.meta.title }}</template>
      <!-- 递归遍历-自己调用自己-->
      <sidebarItem :routerList="( item.children)" />
    </el-sub-menu>

    <!--当前菜单项无子菜单-->
    <el-menu-item :index="item.path" v-else style="padding-left: 45px">
      <template v-if="item.meta.icon">
        <el-icon style="width: 30px;height: 30px"><svg-icon :icon-class="item.meta.icon" /></el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-else>
        {{ item.meta.title }}
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">

import SvgIcon from "@/components/SvgIcon/index.vue";

const props=defineProps({
    //拿到父组件传递过来的路由类别进行渲染
    routerList:{
      type:Array as ()=>any,
      required:true
    }
  })
</script>