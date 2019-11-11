import { GetterTree, MutationTree, ActionTree, Module } from 'vuex'

import { RootState, User, Page } from '@/types'

import { searchCompany, searchColleague } from '@/module/company/api'
import { Cache } from '@/helpers/cache'
import { newPage } from '@/models/page'

export interface CompanyState {
  searchResults: string[]
  colleagues: User[]
  page: Page
  // Similar as colleagues and page, but only for the recommended users.
  yourColleagues: User[]
  yourPage: Page
}

const state: CompanyState = {
  searchResults: [],
  colleagues: [],
  page: newPage(),
  yourColleagues: [],
  yourPage: newPage()
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
      commit('SET_PAGE', newPage())
    } catch (error) {
      console.log(error)
    }
  },

  async searchColleague ({ commit }, { company, limit, offset }) {
    try {
      const { data: colleagues, page } = await ApiCache.searchColleague({
        company,
        limit,
        offset
      })
      commit('SET_COLLEAGUES', colleagues)
      commit('SET_PAGE', page)
    } catch (error) {
      console.log(error)
    }
  },

  async searchYourColleague ({ commit }, { company, limit, offset }) {
    try {
      const { data: colleagues, page } = await ApiCache.searchColleague({
        company,
        limit,
        offset
      })
      commit('SET_YOUR_COLLEAGUES', colleagues)
      commit('SET_YOUR_PAGE', page)
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
  },

  SET_PAGE (state: CompanyState, page: Page) {
    state.page = page
  },

  SET_YOUR_COLLEAGUES (state: CompanyState, colleagues: User[]) {
    state.yourColleagues = colleagues
  },

  SET_YOUR_PAGE (state: CompanyState, page: Page) {
    state.yourPage = page
  }
}

const getters: GetterTree<CompanyState, RootState> = {
  searchResults (state: CompanyState): string[] {
    return state.searchResults
  },

  colleagues (state: CompanyState): User[] {
    return state.colleagues
  },

  page (state: CompanyState): Page {
    return state.page
  },

  yourColleagues(state: CompanyState): User[] {
    return state.yourColleagues
  },

  yourPage(state: CompanyState): Page {
    return state.yourPage
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
