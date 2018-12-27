import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { UserApi } from '@/apis'
import { Score, Leaderboard, User, PageInfo } from '@/models'
import RootState from '../state'

export interface UserState {
  name: string
  users: User[]
  pageInfo?: PageInfo
  userCountByYears: Leaderboard[]
  companyCount: number,
  userCount: number,
  prevCursor: string,
  nextCursor: string,
    userRecommendations: Map<string, Score[]>
}

const namespaced: boolean = true

const state: UserState = {
  name: 'hello',
  users: [],
  userCountByYears: [],
  companyCount: 0,
  userCount: 0,
  prevCursor: '',
  nextCursor: '',
  userRecommendations: new Map()
}

const actions: ActionTree<UserState, RootState> = {
  setName ({ commit }, name: string) {
    commit('setName', name)
  },
  async fetchUsers ({ state, commit }, cursor?: string) {
    if (state.prevCursor === cursor) {
      console.log('already fetching')
      return
    }
    commit('UPDATE_OLD_CURSOR', cursor)
    try {
      const { users, pageInfo, count } = await UserApi.getUsers(cursor)
      commit('SET_CURSOR', pageInfo.endCursor)
      commit('fetchUsersSuccess', { users, pageInfo })
      commit('SET_USER_COUNT', count)
      // HINT: Updates the root state, so that other modules can use the cached
      // data rather than fetching them individually.
      for (let user of users) {
        commit('setUserCache', user, { root: true })
      }
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
  async fetchUserStats ({ commit }, login: string) {
    try {
      const response = await UserApi.getUserStats(login)

      // Update the root.
      commit('setUserCache', response.user, { root: true })
      const data = {
        login: response.user.login,
        languages: response.languages
      }
      commit('setUserLanguagesCache', data, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async fetchRecommendations ({ commit, dispatch }, login: string) {
    try {
      const users = await UserApi.getRecommendations(login)
      await dispatch('fetchUserStats', login)
      for (let user of users) {
        await dispatch('fetchUserStats', user.name)
      }
      commit('SET_RECOMMENDATIONS', { login, users })
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations: MutationTree<UserState> = {
  setName (state: UserState, name: string) {
    state.name = name
  },
  fetchUserCountByYearsSuccess (state: UserState, data: Leaderboard[]) {
    state.userCountByYears = data
  },
  fetchCompanyCountSuccess (state: UserState, count: number) {
    state.companyCount = count
  },
  fetchUsersSuccess (state: UserState, { pageInfo, users }) {
    state.users = state.users.concat(users)
    state.pageInfo = pageInfo
  },
  SET_USER_COUNT (state: UserState, count: number) {
    state.userCount = count
  },
  UPDATE_OLD_CURSOR (state: UserState, cursor: string) {
    state.prevCursor = state.nextCursor
  },
  SET_CURSOR (state: UserState, cursor: string) {
    state.nextCursor = cursor
  },
  SET_RECOMMENDATIONS (state: UserState, { login, users }: { login: string, users: Score[] }) {
    state.userRecommendations.set(login, users)
  }
  // fetchUserStatsSuccess (state: UserState, stat: UserStat) {
  //   state.user
  // }
}

const getters: GetterTree<UserState, RootState> = {
  getName (state: UserState): string {
    return state.name
  },
  recommendations: (state: UserState) => (login: string): Score[] => {
    return state.userRecommendations.get(login) || []
  }
}

const user: Module<UserState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters
}

export default user
