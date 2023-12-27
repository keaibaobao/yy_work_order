<template>
  <div class='navbar'>
    <Breadcrumb class='breadcrumb-container'></Breadcrumb>
    <div style="flex: 3;display: flex;">
      <div style="flex:1"></div>
      <div style="flex:4" ref="navWidth">
        <div class="ui-navs">
          <template v-for="(item,index) in navItem">
            <div class="ui-nav-item " :style="item.isActive?{color: 'white'}:{color: 'gray'}"
                 @click="onSelectNavItem(index,item)">
              <i :class="item.icon"/>
              {{ item.name }}
            </div>
          </template>
        </div>
        <div class="ui-navs-line" :style="{transform:`translateX(${off_x}px)`,'transition-duration':'0.3s'}">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>

import Breadcrumb from "@/components/Breadcrumb/index.vue";
import {reactive, defineComponent} from "vue";

export default defineComponent({
  name: 'HeaderBar',
  components: {
    Breadcrumb
  },
  data() {
    return {
      off_x: 0
    }
  },
  methods: {
    onSelectNavItem: function (index: number, item: any) {
      const navWidth = this.$refs.navWidth as HTMLDivElement
      let nw: number = navWidth.clientWidth / 4
      // console.debug(nw)
      this.off_x = index * nw;
      // 匹配transition-duration的0.3s
      setTimeout(() => {
        this.activeItem(item)
      }, 100)
    }
  },
  setup() {

    interface NavItem {
      name: string
      icon: string
      isActive: boolean
    }

    const navItem: Array<NavItem> = reactive([
      /*{name: "资产管理", icon: "el-icon-s-grid", isActive: true},
      {name: "卫生材料", icon: "el-icon-s-grid", isActive: false},
      {name: "供应链协同", icon: "el-icon-s-shop", isActive: false},*/
     /* {name: "设备管理", icon: "el-icon-s-grid", isActive: true},*/
    ])
    const activeItem = (item: NavItem) => {
      navItem.forEach((v) => {
        v.isActive = false
      })
      item.isActive = true
    }
    return {
      navItem,
      activeItem
    }
  }
})
</script>

<style lang='scss' scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  line-height: 50px;
  display: flex;
  width: 100%;
  background-color: #fff;

  .breadcrumb-container {
    flex: 1;
    float: left;
    margin-left: 20px;
    font-size: 18px;
  }
}

.ui-navs {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  box-sizing: border-box;
  border-bottom: 1px solid #F5F5F5;
}

.ui-nav-item {
  width: 25%;
  text-align: center;
  height: 50px;
  font-size: 18px;
  z-index: 100;
}

.ui-navs-line {
  position: absolute;
  top: 0;
  width: 15%;
  height: 50px;

  //border-radius: 8px;
  z-index: 99;
}
</style>
