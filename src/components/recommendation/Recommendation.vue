<template>
  <div class="recommendation">
    <RecommendationSearchUserInput class="search-user-input-section" />
    <Break :px="33" />

    <div class="section" v-if="user">
      <UserProfile v-bind="user" />
      <Break :px="33" />

      <h3>Your Top Repositories</h3>
      <RecommendationRepositories />
      <Break :px="33" />

      <RecommendationLanguages header="Repository Summary" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

// Components.
import Break from '@/components/Break.vue'
import UserList from '@/components/UserList.vue'
import UserProfile from '@/components/UserProfile.vue'
import RecommendationSearchUserInput from '@/components/recommendation/RecommendationSearchUserInput.vue'
import RecommendationSimilarUsers from '@/components/recommendation/RecommendationSimilarUsers.vue'
import RecommendationLanguages from '@/components/recommendation/RecommendationLanguages.vue'
import RecommendationRepositories from '@/components/recommendation/RecommendationRepositories.vue'

import { User } from '@/types'
import Namespace from '@/models/namespace'

@Component({
  components: {
    Break,
    UserProfile,
    UserList,

    RecommendationSearchUserInput,
    RecommendationSimilarUsers,
    RecommendationLanguages,
    RecommendationRepositories
  }
})
export default class Recommendation extends Vue {
  @State('user', Namespace.match) user?: User
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.recommendation {
}

.search-user-input-section {
  max-width: 360px;
}
</style>
