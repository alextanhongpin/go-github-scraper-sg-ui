<template>
  <div class=''>
    <Break px='21'/>

    <SearchUserInputWithDropdown/>

    <Break/>

    <UserProfileRecommendation class='user-profile-section'>
      <UserProfile slot-scope='user' v-bind='user'/>
    </UserProfileRecommendation>

    <div class='info-section'>


    <div class='recommend-section' v-if='searchUser'>

      <div class='languages'>
        <div class='languages-header'>Repository</div>
        <Break/>
        <div class='languages-subheader'>
          <Counter>{{searchUserLanguages.length}}</Counter> languages
          &nbsp;&nbsp;
          <Counter>{{searchUser.repositories}}</Counter> repositories
        </div>
        <Break/>
        <div class='languages-body'>
          <LanguageCell
          v-for='item in searchUserLanguages.slice(0,displayLanguageCount)'
          :label='item.name'
          class='language'
          >
          ({{formatPercentage(item.count)}}%)

          <span class='language-count'>
            {{item.count}} {{ item.count === 1 ? 'repo' : 'repos'}}
          </span>

          </LanguageCell>
        </div>
        <Break/>
        <div class='language-footer'>
          <button
            class='language-button-toggle'
            v-if='searchUserLanguages.length > maxShowCount'
            @click='toggleLanguage'
            >
            {{displayLanguageLabel}}
          </button>
        </div>
      </div>

      <div>
        <div class='recommend-header'><b>Similar Users</b></div>
        <Break/>
        <div class='recommendations'>
          <a
            class='recommend'
            target='_blank'
            v-for='recommendation in recommendations'
            :href='githubLink(recommendation.login)'
            >
            <img class='recommend-photo' :src='recommendation.avatarUrl'/>
            <div class='recommend-info'>
              <b class='recommend-login'> {{ recommendation.login }} </b>
              <div class='recommend-name'>{{ recommendation.name }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

// Components.
import Break from '@/components/Break.vue'
import Counter from '@/components/Counter.vue'
import LeaderboardUser from '@/components/LeaderboardUser.vue'
import LanguageCell from '@/components/LanguageCell.vue'
import UserProfile from '@/components/UserProfile.vue'
import UserProfileRecommendation from '@/components/UserProfileRecommendation.vue'
import SearchUserInputWithDropdown from '@/components/SearchUserInputWithDropdown.vue'

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
    Counter,
    LeaderboardUser,
    LanguageCell,
    UserProfile,
    UserProfileRecommendation,
    SearchUserInputWithDropdown
  }
})
export default class Recommendation extends Vue {
  displayLanguageCount: number = 5;
  displayLanguageLabel: string = 'Show All'

  // Actions.
  @Action('fetchRecommendations', Namespace.user) fetchRecommendations: any;
  @Action('fetchUsersWithRecommendations', Namespace.user) fetchUsersWithRecommendations: any

  // Getters.
  @Getter('recommendations', Namespace.user) recommendations?: User[];
  @Getter('usersWithRecommendations', Namespace.user) usersWithRecommendations?: string[];

  // States.
  @State('githubUri') githubUri?: string;
  @State('searchUser', Namespace.user) searchUser?: User;
  @State('searchUserLanguages', Namespace.user) searchUserLanguages?: Leaderboard[];

  // Lifecycles.
  mounted () {
    this.fetchUsersWithRecommendations()
  }

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


$user-profile-section-width: 280px;
.user-profile-section {
  margin: $dim-300;
  max-width: $user-profile-section-width;
}

.recommend-section {
  display: grid;
}

.recommendations {
  display: grid;
  grid-row-gap: $dim-300;
}

.recommend {
  display: grid;
  grid-template-columns: $dim-600 1fr;
  grid-column-gap: $dim-100;
  // For overriding link.
  text-decoration: none;
  color: inherit;
  width: 100%;
}

.recommend:hover .recommend-photo {
  box-shadow: 0 5px 15px rgba(black, 0.2);
}

.recommend-photo {
  height: $dim-600;
  width: auto;
  background: $color-silverlake;
  border-radius: 50%;
  vertical-align: middle;
}
// For ellipsis to work in the grid-layout, apply it to the parent container;
.recommend-info {
  overflow: hidden;
}
.recommend-login {
  font-weight: 600;
}
.recommend-name {
  @extend %h6;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.recommend-header {
  margin: 0 $dim-100;
  font-weight: 600;
  @extend %h4;
}

.recommendations {
  display: grid;
  grid-template-columns: minmax(160px, max-content) repeat(auto-fill, 200px);
  grid-auto-flow: row;
}

.languages {
  .languages-header {
    @extend %h4;
    font-weight: 600;
  }
  .languages-subheader {
    @extend %h6;
  }
  .languages-body {
    display: grid;
    grid-row-gap: 5px;
  }
  .language {
    @extend %h6;
    display: grid;
    grid-auto-flow: column;
    justify-content: flex-start;
    align-items: center;
    grid-column-gap: 5px;
  }
  .language-count {
    color: #666666;
    text-transform: uppercase;
  }
  .language-footer {
  }
  .language-button-toggle {
    height: $dim-400;
    padding: 0 $dim-50;
    border-radius: 5px;
  }
}
.info-section {
  display: grid;
  grid-template-columns: 320px 1fr;
}
</style>

