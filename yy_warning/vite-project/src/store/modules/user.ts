import { Module } from 'vuex'
import { User } from '../../types/store'
import { user_login, user_logout, get_user_info } from '../../api/user'
import { getToken, setToken, getRoles, setRoles, getName, setName, getAvatar, setAvatar } from '../../utils/auth'

const userModule: Module<User, any> = {
  namespaced: true,
  state: {
    token: getToken(),
    roles: getRoles(),
    name: getName(),
    avatar: getAvatar(),
    introduction: ''
  },
  mutations: {
    SET_TOKEN: (state, token: string) => {
      state.token = token
      setToken(token)
    },
    SET_ROLES: (state, roles: string) => {
      state.roles = roles
      setRoles(roles)
    },
    SET_NAME: (state, name: string) => {
      state.name = name
      setName(name)
    },
    SET_AVATAR: (state, avatar: string) => {
      state.avatar = avatar
      setAvatar(avatar)
    },
    SET_INTRODUCTION: (state, introduction: string) => {
      state.introduction = introduction
    }
  },
  actions: {
    // user login
    /*
    {
      "code": 20000,
      "message": "登录成功",
      "token": "1fllbe4eh",
      "username": "admin",
      "password": "123",
      "role": "admin",
      "introduction": "管理员",
      "avatar": "https://www.xueyueob.cn/cube/cube01.bmp",
      "email": "admin@qq.com",
      "createTime": 1623318878699
    }
     */
    login({ commit }, userInfo: any)   {
      return new Promise((resolve, reject) => {
          user_login(userInfo)
          .then((res: any) => {
              const data=res.data
              const tokenstr=data.tokenHead+data.token
              setToken(tokenstr)
              commit('SET_TOKEN',tokenstr)
              resolve(res)
          }).catch((error)=>{
              reject(error)
          })
      })
    },

    // user logout
    logout({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        user_logout(state.token)
          .then((res) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            dispatch('tagsView/delAllViews', null, { root: true })
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        get_user_info(state.token)
          .then((res: any) => {
            if (!res) {
              reject('Verification failed, please Login again.')
            }

            const { roles, name, avatar, introduction } = res

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject('getInfo: roles must be a non-null array!')
            }

            commit('SET_NAME', name)
            commit('SET_ROLES', roles)
            commit('SET_AVATAR', avatar)
            commit('SET_INTRODUCTION', introduction)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}

export default userModule
