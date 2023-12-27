import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { RouteRecordRaw } from 'vue-router'

declare interface App {
  device: string
  size: string
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
}

declare interface Permission {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}

declare interface TagsView {
  visitedViews: any[]
  cachedViews: any[]
}

declare interface User {
  token: string | undefined
  roles: string | undefined
  name: string | undefined
  avatar: string | undefined
  introduction: string
}

declare interface State {
  app: App
  permission: Permission
  tagsView: TagsView
  user: User
}

/**
 * https://next.vuex.vuejs.org/zh/guide/typescript-support.html#vue-%E7%BB%84%E4%BB%B6%E4%B8%AD-store-%E5%B1%9E%E6%80%A7%E7%9A%84%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E
 * Vuex 没有为 this.$store 属性提供开箱即用的类型声明。如果你要使用 TypeScript，首先需要声明自定义的模块补充(module augmentation)。
 * 为此，需要在项目文件夹中添加一个声明文件来声明 Vue 的自定义类型 ComponentCustomProperties ：
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
