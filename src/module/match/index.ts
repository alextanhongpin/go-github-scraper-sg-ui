import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

import { User, Leaderboard, Repository, RootState } from '@/types'
import {
  getRecommendations,
  getUsersWithRecommendations,
  getRepositoriesByUser
} from '@/module/match/api'
import { Cache } from '@/helpers/cache'

// Api with cache layer for getters. Can decorate with retries too.
const ApiCache = {
  getRecommendations: Cache(getRecommendations),
  getUsersWithRecommendations: Cache(
    getUsersWithRecommendations,
    () => '$_getUsersWithRecommendations'
  ),
  getRepositoriesByUser: Cache(getRepositoriesByUser)
}

export interface RecommendationState {
  user: User | null
  // Faster checking, also eliminates the lowercase search issue.
  usersWithRecommendationsSet: Set<string>
  usersWithRecommendations: string[]
  recommendations: User[]
  languages: Leaderboard[]
  repositories: Repository[]
  keyword: string
}

const state: RecommendationState = {
  user: null,
  usersWithRecommendationsSet: new Set(),
  usersWithRecommendations: [],
  recommendations: [],
  languages: [],
  repositories: [],
  keyword: ''
}

const actions: ActionTree<RecommendationState, RootState> = {
  async fetchUsersWithRecommendations ({ commit }) {
    try {
      const response = await ApiCache.getUsersWithRecommendations()

      commit('SET_USERS_WITH_RECOMMENDATIONS', response)
    } catch (error) {
      // Retry?
      console.log(error)
    }
  },

  async fetchRecommendationsForUser (
    { commit, rootState, state, dispatch },
    name: string
  ) {
    // If the current user is not in the list, skip.
    if (!state.usersWithRecommendationsSet.has(name.toLowerCase())) {
      return
    }

    try {
      const response = await ApiCache.getRecommendations(name)
      // Fetch the stats of the target user.
      const { user, languages } = await dispatch('user/fetchUserStats', name, {
        root: true
      })
      commit('SET_USER', user)
      commit('SET_LANGUAGES', languages)

      // For each recommended users, fetch the stats.
      const promises = response.map(async ({ name }: { name: string }) => {
        const { user } = await dispatch('user/fetchUserStats', name, {
          root: true
        })
        return user
      })

      const users = await Promise.all(promises)
      commit('SET_RECOMMENDATIONS', users)

      await dispatch('fetchRepositoriesByUser', name)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchRepositoriesByUser ({ commit }, login: string) {
    try {
      const response = await ApiCache.getRepositoriesByUser(login)
      commit('SET_REPOSITORIES', response)
    } catch (error) {
      console.log(error)
    }
  },

  inputKeyword ({ commit }, keyword: string) {
    commit('SET_KEYWORD', keyword)
  }
}

const mutations: MutationTree<RecommendationState> = {
  SET_USERS_WITH_RECOMMENDATIONS (state: RecommendationState, users: string[]) {
    state.usersWithRecommendationsSet = new Set(
      users.map(str => str.toLowerCase())
    )
    state.usersWithRecommendations = users
  },

  SET_LANGUAGES (state: RecommendationState, languages: Leaderboard[]) {
    state.languages = languages
  },

  SET_RECOMMENDATIONS (state: RecommendationState, recommendations: User[]) {
    state.recommendations = recommendations
  },

  SET_USER (state: RecommendationState, user: User) {
    state.user = user
  },

  SET_REPOSITORIES (state: RecommendationState, repositories: Repository[]) {
    state.repositories = repositories
  },

  SET_KEYWORD (state: RecommendationState, keyword: string) {
    state.keyword = keyword
  }
}

const getters: GetterTree<RecommendationState, RootState> = {
  languages (state: RecommendationState) {
    return state.languages
  },

  keyword (state: RecommendationState) {
    return state.keyword
  }
}

export const recommendation: Module<RecommendationState, RootState> = {
  namespaced: true,
  mutations,
  getters,
  actions,
  state
}
export default recommendation
