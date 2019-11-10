import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

import { LeaderboardUserLanguage, User, Leaderboard } from '@/types'
import {
  getLanguages,
  getLeaderboardUserByLanguage,
  searchLanguage
} from '@/module/language/api'
import { Cache } from '@/helpers/cache'
import RootState from '@/types/root-state'

// Api with cache layer for getters. Can decorate with retries too.
const ApiCache = {
  getLanguages: Cache(getLanguages, () => '$_getLanguages'),
  getLeaderboardUserByLanguage: Cache(getLeaderboardUserByLanguage),
  searchLanguage: Cache(searchLanguage)
}

export interface LanguageState {
  // Faster checking, also eliminates the lowercase search issue.
  languages: string[]
  languageSet: Set<string>
  users: LeaderboardUserLanguage[]
  searchResults: string[]
}

const state: LanguageState = {
  languages: [],
  languageSet: new Set(),
  users: [],
  searchResults: []
}

const actions: ActionTree<LanguageState, RootState> = {
  async fetchLanguages ({ commit }) {
    try {
      const response = await ApiCache.getLanguages()
      commit('SET_LANGUAGES', response)
    } catch (error) {
      console.log(error)
    }
  },

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

  clearSearchResults({commit}){
    commit('SET_SEARCH_RESULTS', [])
  }
}

const mutations: MutationTree<LanguageState> = {
  SET_LANGUAGES (state: LanguageState, languages: string[]) {
    state.languageSet = new Set(languages.map(str => str.toLowerCase()))
    state.languages = languages
  },

  SET_USERS (state: LanguageState, users: LeaderboardUserLanguage[]) {
    state.users = users
  },

  SET_SEARCH_RESULTS (state: LanguageState, languages: string[]) {
    state.searchResults = languages
  }
}

const getters: GetterTree<LanguageState, RootState> = {
  searchResults(state: LanguageState): string[] {
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
