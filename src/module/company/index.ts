import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

import RootState from '@/types/root-state'
import { searchCompany } from '@/module/company/api'
import { Cache } from '@/helpers/cache'

export interface CompanyState {
  searchResults: string[]
}

const state: CompanyState = {
  searchResults: []
}

// Define ApiCache.
const ApiCache = {
  searchCompany: Cache(searchCompany)
}

const actions: ActionTree<CompanyState, RootState> = {
  async searchCompany ({ commit }, term: string) {
    try {
      const companies = await ApiCache.searchCompany(term)
      commit('SET_SEARCH_RESULTS', companies)
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations: MutationTree<CompanyState> = {
  SET_SEARCH_RESULTS (state: CompanyState, companies: string[]) {
    state.searchResults = companies
  }
}

const getters: GetterTree<CompanyState, RootState> = {
  searchResults (state: CompanyState): string[] {
    return state.searchResults
  }
}

const company: Module<CompanyState, RootState> = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
}

export default company
