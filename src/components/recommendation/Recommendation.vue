<template>
  <div class='component'>
    <RecommendationSearchUserInput class='search-user-input-section'/>

    <Break px='21'/>

    <div class='section'>
      <div class='aside'>
        <RecommendationUserProfile class='user-profile-section'>
          <UserProfile slot-scope='user' v-bind='user'/>
        </RecommendationUserProfile>
      </div>
      <div class='main'>
        <RecommendationLanguages/>

        <Break px='21'/>

        <RecommendationSimilarUsers
          header='Similar Users'
        >
          <UserList
            slot-scope='user'
            :key='user.login'
            :login='user.login'
            :name='user.name'
            :avatarUrl='user.avatarUrl'
          />
        </RecommendationSimilarUsers>

      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

// Components.
import Break from '@/components/Break.vue'
import UserList from '@/components/UserList.vue'
import UserProfile from '@/components/UserProfile.vue'
import RecommendationUserProfile from '@/components/recommendation/RecommendationUserProfile.vue'
import RecommendationSearchUserInput from '@/components/recommendation/RecommendationSearchUserInput.vue'
import RecommendationSimilarUsers from '@/components/recommendation/RecommendationSimilarUsers.vue'
import RecommendationLanguages from '@/components/recommendation/RecommendationLanguages.vue'

import {
  User,
  Namespace,
  Leaderboard
} from '@/models'

import {
  Action,
  Getter,
  State
} from 'vuex-class'

import { shortDate } from '@/helpers/date'

@Component({
  components: {
    Break,
    UserProfile,
    UserList,

    RecommendationUserProfile,
    RecommendationSearchUserInput,
    RecommendationSimilarUsers,
    RecommendationLanguages
  }
})
export default class Recommendation extends Vue {
  displayLanguageCount: number = 5;
  displayLanguageLabel: string = 'Show All'

  // States.
  @State('githubUri') githubUri?: string;
  @State('searchUser', Namespace.user) searchUser?: User;
  @State('searchUserLanguages', Namespace.user) searchUserLanguages?: Leaderboard[];

  // Methods.

  githubLink (user: string): string {
    return [this.githubUri, user].join('/')
  }

  formatDate (dateStr: string): string {
    return shortDate(dateStr)
  }

  formatPercentage (count: number): string {
    return (count / this.totalRepositoryCount * 100).toFixed(1)
  }

  toggleLanguage () {
    const totalCount = this.searchUserLanguages.length
    const isPartial = this.displayLanguageCount === this.maxShowCount
    this.displayLanguageCount = isPartial
      ? totalCount
      : this.maxShowCount
    this.displayLanguageLabel = isPartial
      ? 'Show Less'
      : 'Show All'
  }

  // Getters.
  get totalRepositoryCount (): number {
    return this.searchUserLanguages.reduce((acc: number, item: Leaderboard) => {
      return acc + item.count
    }, 0)
  }

  get maxShowCount (): number {
    return 5
  }
}

</script>
<style lang='scss' scoped>
@import '@/styles/theme.scss';

.search-user-input-section {
  margin: 0 $dim-300;
  max-width: 360px;
}

.section {
  margin: 0 $dim-300;
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-column-gap: $dim-300;
}

@media (max-width: 640px) {
  .search-user-input-section {
    max-width: 100%;
  }
  .section {
    grid-auto-flow: row;
    grid-row-gap: $dim-300;
    grid-template-columns: 1fr;
  }
  .aside {
    padding: 0 0 $dim-300 0;
    border-bottom: 1px solid #EEEEEE;
    text-align: center;
  }
}
</style>

