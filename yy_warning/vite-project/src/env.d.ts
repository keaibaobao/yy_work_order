/**
 * shims-vue.d.ts的作用
 * 为了 typescript 做的适配定义文件，因为.vue 文件不是一个常规的文件类型，ts 是不能理解 vue 文件是干嘛的，
 * 加这一段是是告诉 ts，vue 文件是这种类型的。
 * 可以把这一段删除，会发现 import 的所有 vue 类型的文件都会报错。
 */
/**
 * defineComponent可以给组件的setup方法准确的参数类型定义.
 * defineComponent 可以接受显式的自定义 props 接口或从属性验证对象中自动推断
 * defineComponent 可以正确适配无 props、数组 props 等形式
 * 引入 defineComponent() 以正确推断 setup() 组件的参数类型
 */

/**
 * https://v3.cn.vuejs.org/guide/typescript-support.html#%E5%AE%9A%E4%B9%89-vue-%E7%BB%84%E4%BB%B6
 * 要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件：
 import { defineComponent } from 'vue'
 const Component = defineComponent({
  // 已启用类型推断
})
 如果你使用的是单文件组件，则通常会被写成：
 <script lang="ts">
 import { defineComponent } from 'vue'
 export default defineComponent({
  // 已启用类型推断
})
 </script>
 */
declare module '*.vue' {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
