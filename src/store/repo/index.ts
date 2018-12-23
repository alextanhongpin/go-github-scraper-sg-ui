import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree
} from 'vuex'
import { RepoApi } from '@/apis'

import RootState from '../state'
import { Leaderboard } from '@/models'

const namespaced: boolean = true

export interface RepoState {
  leaderboardRepositoryByYears: Leaderboard[]
  leaderboardLanguage: Leaderboard[]
  leaderboardRepository: Leaderboard[]
  leaderboardUser: Leaderboard[]
  maxLanguageCount: number
}

// Initial state.
const state: RepoState = {
  leaderboardRepositoryByYears: [],
  leaderboardLanguage: [],
  leaderboardRepository: [],
  leaderboardUser: [],
  maxLanguageCount: 0
}

const actions: ActionTree<RepoState, RootState> = {
  async fetchRepositoriesByYears ({ commit }) {
    try {
      const data = await RepoApi.getRepositoryCountByYears()
      commit('fetchRepositoriesByYearsSuccess', data)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchLeaderboardLanguage ({ commit }) {
    try {
      const data = await RepoApi.getLeaderboardLanguage()
      commit('fetchLeaderboardLanguageSuccess', data)
      const maxLanguageCount = Math.max(...data.map(row => row.count))
      commit('setMaxLanguageCount', maxLanguageCount)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchLeaderboardRepository ({ commit }) {
    try {
      const data = await RepoApi.getLeaderboardRepository()
      commit('fetchLeaderboardRepositorySuccess', data)
    } catch (error) {
      console.log(error)
    }
  },
  async fetchLeaderboardUser ({ commit, dispatch }) {
    try {
      const data = await RepoApi.getLeaderboardUser()
      commit('fetchLeaderboardUserSuccess', data)
      for (let user of data) {
        const login = user.name
        await dispatch('user/fetchUserStats', login, { root: true })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations: MutationTree<RepoState> = {
  fetchRepositoriesByYearsSuccess (state: RepoState, data: Leaderboard[]) {
    state.leaderboardRepositoryByYears = data
  },
  fetchLeaderboardRepositorySuccess (state: RepoState, data: Leaderboard[]) {
    state.leaderboardRepository = data
  },
  fetchLeaderboardUserSuccess (state: RepoState, data: Leaderboard[]) {
    state.leaderboardUser = data
  },
  fetchLeaderboardLanguageSuccess (state: RepoState, data: Leaderboard[]) {
    state.leaderboardLanguage = data
  },
  setMaxLanguageCount (state: RepoState, count: number) {
    state.maxLanguageCount = count
  }
}

const getters: GetterTree<RepoState, RootState> = {}

const repo: Module<RepoState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters
}

export default repo
