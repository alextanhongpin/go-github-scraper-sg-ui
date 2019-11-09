import Vue from 'vue'
import Vuex, { StoreOptions, GetterTree } from 'vuex'

// State.
import RootState from '@/types/root-state'

// Modules.
import user from './user'
import match from './match'
import repo from './repo'
import language from './language'

import { User, Leaderboard } from '@/types'

Vue.use(Vuex)

const getters: GetterTree<RootState, any> = {}

const store: StoreOptions<RootState> = {
  state: {
    version: process.env.VUE_APP_GIT_VERSION || '1.0.0',
    brand: 'GitHub',
    githubUri: 'https://github.com'
  },
  modules: {
    user,
    repo,
    match,
    language
  },
  getters,
  mutations: {},
  actions: {}
}

export default new Vuex.Store<RootState>(store)
