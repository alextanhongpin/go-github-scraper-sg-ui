import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

import { LeaderboardUserLanguage, User, Leaderboard } from '@/types'
import {
  getLeaderboardUserByLanguage,
  searchLanguage
} from '@/module/language/api'
import { Cache } from '@/helpers/cache'
import RootState from '@/types/root-state'

// Api with cache layer for getters. Can decorate with retries too.
const ApiCache = {
  getLeaderboardUserByLanguage: Cache(getLeaderboardUserByLanguage),
  searchLanguage: Cache(searchLanguage)
}

export interface LanguageState {
  users: LeaderboardUserLanguage[]
  searchResults: string[]
}

const state: LanguageState = {
  users: [],
  searchResults: []
}

const actions: ActionTree<LanguageState, RootState> = {
  async fetchLeaderboardUserByLanguage (
    { commit, dispatch },
    language: string
  ) {
    try {
      const response = await ApiCache.getLeaderboardUserByLanguage(language)
      const promises = response.map(async (item: Leaderboard) => {
        const result = await dispatch('user/fetchUserStats', item.name, {
          root: true
        })
        return {
          user: result.user,
          count: item.count
        }
      })
      const data = await Promise.all(promises)
      commit('SET_USERS', data)
    } catch (error) {
      console.log(error)
    }
  },

  async searchLanguage ({ commit }, term: string) {
    try {
      const response = await ApiCache.searchLanguage(term)
      commit('SET_SEARCH_RESULTS', response)
    } catch (error) {
      console.log(error)
    }
  },

  clearSearchResults ({ commit }) {
    commit('SET_SEARCH_RESULTS', [])
  }
}

const mutations: MutationTree<LanguageState> = {
  SET_USERS (state: LanguageState, users: LeaderboardUserLanguage[]) {
    state.users = users
  },

  SET_SEARCH_RESULTS (state: LanguageState, languages: string[]) {
    state.searchResults = languages
  }
}

const getters: GetterTree<LanguageState, RootState> = {
  searchResults (state: LanguageState): string[] {
    return state.searchResults
  }
}

export const language: Module<LanguageState, RootState> = {
  namespaced: true,
  mutations,
  getters,
  actions,
  state
}
export default language
