import Vue from 'vue'
import Vuex, { StoreOptions, GetterTree } from 'vuex'

// State.
import RootState from './state'

// Modules.
import user from './user'
import repo from './repo'
import { User, Leaderboard } from '@/models'

Vue.use(Vuex)

const getters: GetterTree<RootState, any> = {
  getUser: (state: RootState) => (login: string): User|undefined => {
    return state.userCache.get(login)
  },
  getUserLanguages (state: RootState, login: string): Leaderboard[] {
    return state.userLanguagesCache.get(login) || []
  }
}

const store: StoreOptions<RootState> = {
  state: {
    version: process.env.VUE_APP_GIT_VERSION || '1.0.0',
    brand: 'Github',
    userCache: new Map(),
    userLanguagesCache: new Map(),
    githubUri: 'https://github.com'
  },
  modules: {
    user,
    repo
  },
  mutations: {
    setUserCache (state: RootState, user: User) {
      state.userCache.set(user.login, user)
    },
    setUserLanguagesCache (state: RootState, { login, languages }: { login: string, languages: Leaderboard[] }) {
      state.userLanguagesCache.set(login, languages)
    }
  },
  getters,
  actions: {
  }
}

export default new Vuex.Store<RootState>(store)
