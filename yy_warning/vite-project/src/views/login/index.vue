<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="login-title">系统登录</div>
      <el-form ref="loginFormRef" class="login-form" :model="param" :rules="rules" status-icon>
        <el-form-item prop="userName">
          <el-input v-model="param.userName" clearable placeholder="用户名" :prefix-icon="User">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              v-model="param.password"
              clearable
              placeholder="密码"
              :type="passwordType"
              :prefix-icon="Lock"
              @keyup.enter="submitForm"
          >
<!--            <template #prepend>-->
<!--              <i v-show="passwordLock" class="el-icon-lock" @click="switchPass" />-->
<!--              <i v-show="!passwordLock" class="el-icon-unlock" @click="switchPass" />-->
<!--            </template>-->
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :loading="btnLoading" @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref, reactive} from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { validate } from '@/utils/formExtend'
import {Lock, User} from "@element-plus/icons-vue";

const router = useRouter()

const btnLoading = ref(false)
const loginFormRef = ref(null)
const passwordLock = ref(true)
const passwordType = ref('password')

const param = reactive({
  userName: '',
  password: ''
})

const rules = reactive({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// const switchPass = () => {
//   if (passwordLock.value) {
//     passwordType.value = 'text'
//   } else {
//     passwordType.value = 'password'
//   }
//   passwordLock.value = !passwordLock.value
// }

const submitForm = async () => {
  const valid = await validate(loginFormRef)
  if (valid) {
    btnLoading.value = true
    // 访问登录接口
    store.dispatch('user/login', param).then(() => {
          router.push('/home')
    })
      .finally(() => {
        btnLoading.value = false
      })
  } else {
    ElMessage.error('请输入用户名和密码')
  }
}

</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2d8cf0;
  background-size: cover;
}

.login-title {
  width: 100%;
  font-size: 20px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}

.login-form {
  padding: 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #85155c;
}
</style>
