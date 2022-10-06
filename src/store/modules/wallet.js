import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { login, getInfo, logout } from '@/api/login'
import {WALLET_ADDRESS} from '@/store/mutation-types'
import { welcome } from '@/utils/util'

storage.addPlugin(expirePlugin)
const w3wallet = {
  state: {
    name: '',
    address: '',
    network_id: '',
    type: 'MAINNET',
    avatar: '',
  },

  mutations: {
    SET_WALLET_NAME: (state, wallet) => {
      state.wallet = wallet
    },
    SET_ADDRESS: (state, address) => {
      state.token = address
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_NETWORK: (state, net_id) => {
      state.net_id = net_id
    },
    SET_TYPE: (state, type) => {
      state.info = type
    }
  },

  actions: {
    LoginWallet ({ commit }, walletInfo) {
      return new Promise((resolve, reject) => {
        storage.set(WALLET_ADDRESS, walletInfo.address, new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        commit('SET_WALLET_NAME', walletInfo.name)
        commit('SET_ADDRESS', walletInfo.address)
        commit('SET_NETWORK', walletInfo.network_id)
        commit('SET_NETWORK', walletInfo.network_id)
        commit('SET_TYPE', walletInfo.type)
        resolve()
      })
    },

    // 获取用户信息
    GetWalletInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求后端获取用户信息 /api/user/info
        getInfo().then(response => {
          const { result } = response
          if (result.role && result.role.permissions.length > 0) {
            const role = { ...result.role }
            role.permissions = result.role.permissions.map(permission => {
              const per = {
                ...permission,
                actionList: (permission.actionEntitySet || {}).map(item => item.action)
               }
              return per
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            // 覆盖响应体的 role, 供下游使用
            result.role = role

            commit('SET_ROLES', role)
            commit('SET_INFO', result)
            commit('SET_NAME', { name: result.name, welcome: welcome() })
            commit('SET_AVATAR', result.avatar)
            // 下游
            resolve(result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogoutWallet ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_WALLET_NAME', '')
          commit('SET_ADDRESS', '')
          commit('SET_NETWORK', '')
          commit('SET_TYPE', '')
          storage.remove(WALLET_ADDRESS)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          // resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default w3wallet
