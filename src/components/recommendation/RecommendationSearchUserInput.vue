<template>
  <div>
    <SearchUserInput @keyup='search'>
      <!--Display suggestions-->
      <Dropdown
        v-if='showDropdown'
        :items='suggestions'
      />
    </SearchUserInput>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import Dropdown from '@/components/Dropdown.vue'
import SearchUserInput from '@/components/SearchUserInput.vue'
import { Action, Getter, State } from 'vuex-class'
import {
  User,
  Namespace
} from '@/models'
import { throttle } from '@/helpers/throttle'

@Component({
  components: {
    Dropdown,
    SearchUserInput
  }
})
export default class RecommendationSearchUserInput extends Vue {
  private keyword: string = '';

  // Actions.
  @Action('fetchUsersWithRecommendations', Namespace.recommendation) fetchUsersWithRecommendations: any
  @Action('fetchRecommendationsForUser', Namespace.recommendation) fetchRecommendations: any;

  // States.
  @State('usersWithRecommendations', Namespace.recommendation) usersWithRecommendations?: string[];
  @State('user', Namespace.recommendation) user?: User;

  // Lifecycles.
  async mounted () {
    await this.fetchUsersWithRecommendations()
  }

  // Getters.
  get showDropdown (): boolean {
    const { user, keyword } = this
    const hasKeyword = keyword.trim().length > 0
    const hasMatches = keyword.toLowerCase() === (user && user.login.toLowerCase())
    return hasKeyword && !hasMatches
  }

  get suggestions (): string[] {
    return this.usersWithRecommendations.filter(name => name.toLowerCase().startsWith(this.keyword.toLowerCase()))
  }

  // Methods.
  search (keyword: string) {
    this.keyword = keyword
    if (this.keyword.trim().length) {
      this.throttleFetch(this.keyword)
    }
  }

  @throttle(250)
  throttleFetch(keyword: string) {
    this.fetchRecommendations(keyword)
  }
}
</script>
<style lang='scss' scoped>
</style>
