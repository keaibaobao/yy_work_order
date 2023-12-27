<template>
  <div class='bottom-avatar-wrapper'>
<!--
    <div class='bottom-avatar-container'>
      <div class='bottom-avatar-icon-wrapper'>
        <i class='bottom-avatar-icon el-icon-user-solid' />
        <span>毕晓昉(06601)</span>
      </div>
      <el-dropdown>
        <i class='bottom-avatar-dropdown el-icon-setting' />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click='editPossword'>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click='loginOut'>退出登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>-->

  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'

const router = useRouter()

const loginOut = () => {
  ElMessageBox.confirm('退出登录', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/logout').then(() => {
        router.push('/login')
      })
    }).catch(() => {
  })
}
const editPossword = () => {
  ElMessage('你成功了,恭喜你!')
}

</script>

<style lang='scss' scoped>
.bottom-avatar-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 60px;

  .bottom-avatar-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    height: 60px;
    color: white;
    background-color: #0e6be6;
  }

  .bottom-avatar-icon-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
  }

  .bottom-avatar-icon {
    margin-right: 10px;
    font-size: 18px;
  }

  .bottom-avatar-dropdown {
    font-size: 18px;
    color: white;
  }

  :deep(.right-menu) {
    display: flex;
    float: right;
    height: 100%;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      margin: 0 4px;
      vertical-align: middle;
    }

    .international {
      vertical-align: top;
    }

    .theme-switch {
      vertical-align: 15px;
    }

    .avatar-container {
      // height: 50px;
      margin-right: 30px;

      .avatar-wrapper {
        width: 100%;

      }
    }
  }
}
</style>
