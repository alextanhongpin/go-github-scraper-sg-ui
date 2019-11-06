import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import * as UserApi from '@/module/user/api'
import { Cache } from '@/helpers/cache'

// Types.
import {
  User,
  Leaderboard,
  PageInfo,
  Score,
  UserStat,
  RootState
} from '@/types'

export interface UserState {
  users: User[]
  userCountByYears: Leaderboard[]
  companyCount: number
  userCount: number
}

const ApiCache = {
  getUserStats: Cache(UserApi.getUserStats)
}

const ApiGenerator = {
  getUsers: UserApi.getUsersGenerator()
}

const state: UserState = {
  users: [],
  userCountByYears: [],
  companyCount: 0,
  userCount: 0
}

const actions: ActionTree<UserState, RootState> = {
  setName ({ commit }, name: string) {
    commit('setName', name)
  },
  async fetchUsers ({ state, commit }, cursor?: string) {
    try {
      const { value } = await ApiGenerator.getUsers.next()
      const { users, count } = value
      commit('SET_USERS', users)
      commit('SET_USER_COUNT', count)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchUserCountByYears ({ commit }) {
    try {
      const data = await UserApi.getUserCountByYears()
      commit('fetchUserCountByYearsSuccess', data)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchCompanyCount ({ commit }) {
    try {
      const count = await UserApi.getCompanyCount()
      commit('fetchCompanyCountSuccess', count)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchUserCount ({ commit }) {
    try {
      const count = await UserApi.getUserCount()
      commit('SET_USER_COUNT', count)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchUserStats (
    { commit, state, rootState },
    login: string
  ): Promise<UserStat | null> {
    try {
      const response = await ApiCache.getUserStats(login)
      const data = {
        login: response.user.login,
        languages: response.languages
      }
      return response
    } catch (error) {
      console.log(error)
    }
    return null
  }
}

const mutations: MutationTree<UserState> = {
  fetchUserCountByYearsSuccess (state: UserState, data: Leaderboard[]) {
    state.userCountByYears = data
  },
  fetchCompanyCountSuccess (state: UserState, count: number) {
    state.companyCount = count
  },
  SET_USERS (state: UserState, users: User[]) {
    state.users = state.users.concat(users)
  },
  SET_USER_COUNT (state: UserState, count: number) {
    state.userCount = count
  }
}

const getters: GetterTree<UserState, RootState> = {}

const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

export default user
