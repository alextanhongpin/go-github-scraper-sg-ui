import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import * as UserApi from '@/module/user/api'
import { Cache } from '@/helpers/cache'

// Types.
import {
  Leaderboard,
  PageInfo,
  RootState,
  Score,
  User,
  UserStat
} from '@/types'

export interface UserState {
  companies: Leaderboard[]
  companyCount: number
  colleagues: User[]
  companyUsers: User[]
  userCount: number
  userCountByYears: Leaderboard[]
  users: User[]
}

const ApiCache = {
  getUserStats: Cache(UserApi.getUserStats)
}

const ApiGenerator = {
  getUsers: UserApi.getUsersGenerator()
}

const state: UserState = {
  companies: [],
  companyCount: 0,
  colleagues: [],
  companyUsers: [],
  userCount: 0,
  userCountByYears: [],
  users: []
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
  },

  async fetchCompanyUsers ({ commit }, company: string) {
    try {
      const response = await UserApi.getCompanyUsers(company)
      commit('SET_COMPANY_USERS', response)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchColleagues ({ commit }, company: string) {
    try {
      const response = await UserApi.getCompanyUsers(company)
      commit('SET_COLLEAGUES', response)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchTopCompanies ({ commit }) {
    try {
      const response = await UserApi.getTopCompanies()
      commit('SET_TOP_COMPANIES', response)
    } catch (error) {
      console.log(error)
    }
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
  },

  SET_COMPANY_USERS (state: UserState, users: User[]) {
    state.companyUsers = users
  },

  SET_TOP_COMPANIES (state: UserState, companies: Leaderboard[]) {
    state.companies = companies
  },

  SET_COLLEAGUES (state: UserState, users: User[]) {
    state.colleagues = users
  }
}

const getters: GetterTree<UserState, RootState> = {
  companyUsers (state: UserState): User[] {
    return state.companyUsers
  },

  colleagues (state: UserState): User[] {
    return state.colleagues
  },

  companies (state: UserState): Leaderboard[] {
    return state.companies
  }
}

const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

export default user
