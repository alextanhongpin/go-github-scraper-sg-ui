<template>
  <search-input @keyup="search">
    <dropdown v-if="showDropdown" :items="searchUserResults">
      <div slot-scope="{ item }" @click.self="selectItem(item)">{{ item }}</div>
    </dropdown>
  </search-input>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter, State } from 'vuex-class'

// Components.
import Dropdown from '@/components/Dropdown.vue'
import SearchInput from '@/components/SearchUserInput.vue'

// Types.
import { User } from '@/types'

// Models.
import Namespace from '@/models/namespace'

import { throttle } from '@/helpers/throttle'

@Component({
  components: {
    Dropdown,
    SearchInput
  }
})
export default class RecommendationSearchUserInput extends Vue {
  // Actions.
  @Action('fetchUsersWithRecommendations', Namespace.match)
  fetchUsersWithRecommendations: any

  @Action('fetchRecommendationsForUser', Namespace.match)
  fetchRecommendations: any

  @Action('inputKeyword', Namespace.match) inputKeyword: any
  @Action('searchUser', Namespace.user) searchUser: any
  @Action('clearRecommendations', Namespace.match) clearRecommendations: any

  @State('user', Namespace.match) user?: User

  // Getters.
  @Getter('searchUserResults', Namespace.user) searchUserResults: string
  @Getter('keyword', Namespace.match) keyword: string
  @Getter('userWithMatches', Namespace.match) userWithMatches: Set<string>

  @Watch('$route', { immediate: true, deep: true })
  async onUrlChange (route: any) {
    const login = route.params.login
    if (login) {
      this.inputKeyword('')
      await this.fetchRecommendations(login)
    } else {
      this.clearRecommendations()
    }
  }

  // Lifecycles.
  async mounted () {
    const login = this.$route.params.login
    await this.fetchUsersWithRecommendations()
    if (login) {
      await this.fetchRecommendations(login)
    }
  }

  // Getters.
  get showDropdown (): boolean {
    const { user, keyword } = this
    const hasKeyword = keyword.trim().length > 0
    const hasMatches =
      keyword.toLowerCase() === (user && user.login.toLowerCase())
    return hasKeyword && !hasMatches
  }

  // Methods.
  search (keyword: string) {
    this.inputKeyword(keyword)
    if (keyword.trim().length) {
      this.throttleFetch(keyword)
    }
  }

  selectItem (item) {
    this.inputKeyword(item)
    this.fetchUser(item)
  }

  @throttle(250)
  throttleFetch (keyword: string) {
    this.searchUser(keyword)
  }

  fetchUser (login: string) {
    this.$router.push('/' + login)
  }
}
</script>
<style lang="scss" scoped></style>
