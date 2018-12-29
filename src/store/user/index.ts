import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'
import { UserApi } from '@/apis'
import {
  Leaderboard,
  PageInfo,
  Score,
  User
} from '@/models'
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
  userRecommendations: Map<string, Score[]>,
  usersWithRecommendations: Set<string>,
  // The metadata of the user that is being search.
  searchUser: User|null,
  // The recommendations of the user that is being search.
  searchUserRecommendations: User[]
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
  userRecommendations: new Map(),
  // Feature: Search with recommendations.
  usersWithRecommendations: new Set(),
  searchUser: null,
  searchUserRecommendations: []
}

const actions: ActionTree<UserState, RootState> = {
  setName ({ commit }, name: string) {
    commit('setName', name)
  },
  async fetchUsers ({ state, commit }, cursor?: string) {
    if (state.prevCursor === cursor) {
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
  async fetchUserStats ({ commit, state, rootState }, login: string): Promise<User|null> {
    if (rootState.userCache.has(login)) {
      return rootState.userCache.get(login)!
    }

    try {
      const response = await UserApi.getUserStats(login)

      // Update the root.
      commit('setUserCache', response.user, { root: true })
      const data = {
        login: response.user.login,
        languages: response.languages
      }
      commit('setUserLanguagesCache', data, { root: true })
      return response.user
    } catch (error) {
      console.log(error)
    }
    return null
  },
  async fetchRecommendations ({ commit, dispatch, state }, login: string) {
    if (!state.usersWithRecommendations.has(login)) {
      return
    }

    try {
      const users = await UserApi.getRecommendations(login)
      const user = await dispatch('fetchUserStats', login)
      const promises = users.map(({ name }: { name: string }) => {
        return dispatch('fetchUserStats', name)
      })
      const recommendations = await Promise.all(promises)

      // for (let user of users) {
      //   const stat = await dispatch('fetchUserStats', user.name)
      // }
      commit('SET_RECOMMENDATIONS', { login, user, users, recommendations })
      return recommendations
    } catch (error) {
      console.log(error)
    }
  },
  async fetchUsersWithRecommendations ({ commit }) {
    try {
      const users = await UserApi.getUsersWithRecommendations()
      commit('SET_USERS_WITH_RECOMMENDATIONS', users)
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
  SET_RECOMMENDATIONS (state: UserState, { user, login, users, recommendations }: { user: User, login: string, users: Score[], recommendations: User[] }) {
    state.userRecommendations.set(login, users)
    state.searchUserRecommendations = recommendations
    state.searchUser = user
  },
  SET_USERS_WITH_RECOMMENDATIONS (state: UserState, users: string[]) {
    for (let user of users) {
      // Lowercase makes searching easier.
      state.usersWithRecommendations.add(user.toLowerCase())
    }
  }
  // fetchUserStatsSuccess (state: UserState, stat: UserStat) {
  //   state.user
  // }
}

const getters: GetterTree<UserState, RootState> = {
  getName (state: UserState): string {
    return state.name
  },
  recommendations (state: UserState, _, rootState: RootState): User[] {
    return state.searchUserRecommendations
  },
  usersWithRecommendations: (state: UserState) => (keyword: string): string [] => {
    return Array.from(state.usersWithRecommendations).filter(u => u.startsWith(keyword))
    // return [...state.usersWithRecommendations]
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
