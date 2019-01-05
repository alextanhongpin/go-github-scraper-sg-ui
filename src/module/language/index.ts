import {
  GetterTree,
  MutationTree,
  ActionTree,
  Module
} from 'vuex'

import { LeaderboardUserLanguage, User, Leaderboard } from '@/models'
import {
  getLanguages,
  getLeaderboardUserByLanguage
} from '@/module/language/api'
import { Cache } from '@/helpers/cache'
import RootState from '@/module/state'

// Api with cache layer for getters. Can decorate with retries too.
const ApiCache = {
  getLanguages: Cache(getLanguages, () => '$_getLanguages'),
  getLeaderboardUserByLanguage: Cache(getLeaderboardUserByLanguage)
}

export interface LanguageState {
  // Faster checking, also eliminates the lowercase search issue.
  languages: string[],
  languageSet: Set<string>,
  users: LeaderboardUserLanguage[]
}

const state: LanguageState = {
  languages: [],
  languageSet: new Set(),
  users: []
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
  async fetchLeaderboardUserByLanguage ({ commit, dispatch }, language: string) {
    try {
      const response = await ApiCache.getLeaderboardUserByLanguage(language)

      const promises = response.map(async (item: Leaderboard) => {
        const result = await dispatch('user/fetchUserStats', item.name, { root: true })
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
  }
}

const mutations: MutationTree<LanguageState> = {
  SET_LANGUAGES (state: LanguageState, languages: string[]) {
    state.languageSet = new Set(languages.map(str => str.toLowerCase()))
    state.languages = languages
  },
  SET_USERS (state: LanguageState, users: LeaderboardUserLanguage[]) {
    state.users = users
  }
}

const getters: GetterTree<LanguageState, RootState> = {
}

export const language: Module<LanguageState, RootState> = {
  namespaced: true,
  mutations,
  getters,
  actions,
  state
}
export default language
