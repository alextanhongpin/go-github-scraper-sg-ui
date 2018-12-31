import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree
} from 'vuex'
import * as RepoApi from '@/store/repo/api'

import RootState from '@/store/state'
import { Leaderboard, LeaderboardUserWithStats, User } from '@/models'

export interface RepoState {
  leaderboardRepositoryByYears: Leaderboard[]
  leaderboardLanguage: Leaderboard[]
  leaderboardRepository: Leaderboard[]
  leaderboardUser: LeaderboardUser[]
  maxLanguageCount: number,
  totalLanguageCount: number
}

export interface LeaderboardUser {
  user: User;
  languages: Leaderboard[];
  count: number;
}

// Initial state.
const state: RepoState = {
  leaderboardRepositoryByYears: [],
  leaderboardLanguage: [],
  leaderboardRepository: [],
  leaderboardUser: [],
  maxLanguageCount: 0,
  totalLanguageCount: 0
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
      commit('SET_MAX_LANGUAGE_COUNT', maxLanguageCount)
      const totalLanguageCount = data.reduce((acc: number, data: Leaderboard) => {
        return acc + data.count
      }, 0)
      commit('SET_TOTAL_LANGUAGE_COUNT', totalLanguageCount)
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
      const promises = data.map(async ({ name, count }) => {
        const result = await dispatch('user/fetchUserStats', name, { root: true })
        return { ...result, count }
      })
      const response = await Promise.all(promises)
      commit('fetchLeaderboardUserSuccess', response)
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
  SET_LEADERBOARD_USER (state: RepoState, data: LeaderboardUser[]) {
    state.leaderboardUser = data
  },
  fetchLeaderboardLanguageSuccess (state: RepoState, data: Leaderboard[]) {
    state.leaderboardLanguage = data
  },
  SET_MAX_LANGUAGE_COUNT (state: RepoState, count: number) {
    state.maxLanguageCount = count
  },
  SET_TOTAL_LANGUAGE_COUNT (state: RepoState, count: number) {
    state.totalLanguageCount = count
  }
}

const getters: GetterTree<RepoState, RootState> = {}

const repo: Module<RepoState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

export default repo
