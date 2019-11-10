import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

import { RootState, User } from '@/types'

import { searchCompany, searchColleague } from '@/module/company/api'
import { Cache } from '@/helpers/cache'

export interface CompanyState {
  searchResults: string[]
  colleagues: User[]
}

const state: CompanyState = {
  searchResults: [],
  colleagues: []
}

// Define ApiCache.
const ApiCache = {
  searchCompany: Cache(searchCompany),
  searchColleague: Cache(searchColleague)
}

const actions: ActionTree<CompanyState, RootState> = {
  async searchCompany ({ commit }, term: string) {
    try {
      const companies = await ApiCache.searchCompany(term)
      commit('SET_SEARCH_RESULTS', companies)
    } catch (error) {
      console.log(error)
    }
  },

  async searchColleague ({ commit }, company: string) {
    try {
      const colleagues = await ApiCache.searchColleague(company)
      commit('SET_COLLEAGUES', colleagues)
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations: MutationTree<CompanyState> = {
  SET_SEARCH_RESULTS (state: CompanyState, companies: string[]) {
    state.searchResults = companies
  },

  SET_COLLEAGUES (state: CompanyState, colleagues: User[]) {
    state.colleagues = colleagues
  }
}

const getters: GetterTree<CompanyState, RootState> = {
  searchResults (state: CompanyState): string[] {
    return state.searchResults
  },

  colleagues (state: CompanyState): User[] {
    return state.colleagues
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
