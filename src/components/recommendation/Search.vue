<template>
  <search-input @keyup="search">
    <!--Display suggestions-->
    <dropdown v-if="showDropdown" :items="suggestions">
      <div slot-scope="{ item }" @click.self="selectItem(item)">{{ item }}</div>
    </dropdown>
  </search-input>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
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

  // States.
  @State('usersWithRecommendations', Namespace.match)
  usersWithRecommendations?: string[]
  @State('user', Namespace.match) user?: User

  // Getters.
  @Getter('keyword', Namespace.match) keyword: string

  // Lifecycles.
  async mounted () {
    await this.fetchUsersWithRecommendations()
  }

  // Getters.
  get showDropdown (): boolean {
    const { user, keyword } = this
    const hasKeyword = keyword.trim().length > 0
    const hasMatches =
      keyword.toLowerCase() === (user && user.login.toLowerCase())
    return hasKeyword && !hasMatches
  }

  get suggestions (): string[] {
    return this.usersWithRecommendations.filter(name =>
      name.toLowerCase().startsWith(this.keyword.toLowerCase())
    )
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
    this.search(item)
  }

  @throttle(250)
  throttleFetch (keyword: string) {
    this.fetchRecommendations(keyword)
  }
}
</script>
<style lang="scss" scoped></style>
