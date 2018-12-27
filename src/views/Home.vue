<template>
  <div class="home">
    <Break/>
    <div class='search-wrapper'>
      <input
        class='search'
        type='search'
        placeholder='Enter your Github username'
        @keyup='search'
      />
    </div>
    <Break/>

    <div class='recommend-section' v-if='recommendations(keyword).length'>
      <GithubCard :user="searchUser"/>

      <div>
        <div class='recommend-header'><b>Similar Users</b></div>
        <Break/>
        <div class='recommendations'>
          <a
       class='recommend'
       target='_blank'
       v-for='recommendation in recommendations(keyword)'
       :href='githubLink(recommendation.name)'
       >
       <img class='recommend-photo' :src='getUser(recommendation.name) && getUser(recommendation.name).avatarUrl'/>
       <div class='recommend-info'>
         <b class='recommend-login'> {{recommendation.name}} </b>
         <div class='recommend-name'>{{ getUser(recommendation.name) && getUser(recommendation.name).name }}</div>
       </div>
          </a>
        </div>
      </div>
    </div>

    <Carousel v-on:scroll-horizontal='scroll'>
      <GithubCard slot="carousel" :user="user" v-for="user in users"/>
    </Carousel>

    <h3>User created by Year</h3>
    <div>Total Users Indexed: {{userCount}}</div>
    <LeaderboardCell v-bind="user" v-for="user in userCountByYears"/>

    <h3>Company found</h3>
    <div>
      {{companyCount}}
    </div>

    <h3>Repositories created by Year</h3>
    <LeaderboardCell v-bind="data" v-for="data in leaderboardRepositoryByYears"/>



    <div class='leaderboard-user'>
      <div class='leaderboard-user__header'>Top Active Users</div>
      <Break px='5'/>
      <div class='leaderboard-user__subheader'>
        IN MALAYSIA AND SINGAPORE
      </div>
      <Break px='12'/>
      <LeaderboardUser v-bind="data" v-for="data in leaderboardUserWithStats"/>
    </div>

    <LeaderboardLanguage
      :totalCount='totalLanguageCount'
      :items='leaderboardLanguage'
    />

    <!-- <h3>Leaderboard Repositories</h3> -->
    <!-- <LeaderboardCell v-bind="data" v-for="data in leaderboardRepository"/> -->
  </div>
</template>

<script lang="ts">
// HINT: Use v-bind to spread the objects as props in the component.
// HINT: @ is an alias to /src
// HINT: Add static images. <img alt="Vue logo" src="../assets/logo.png">
import { Component, Vue } from 'vue-property-decorator'

// Components.
import Break from '@/components/Break.vue'
import GithubCard from '@/components/GithubCard.vue'
import GridCard from '@/components/GridCard.vue'
import Carousel from '@/components/Carousel.vue'
import LeaderboardCell from '@/components/LeaderboardCell.vue'
import LeaderboardLanguage from '@/components/LeaderboardLanguage.vue'
import LeaderboardUser from '@/components/LeaderboardUser.vue'
import GridRow from '@/components/GridRow.vue'

import { Score, Leaderboard, User } from '@/models'
import { Action, Getter, State } from 'vuex-class'
import { Namespace } from '@/models'

@Component({
  components: {
    Break,
    Carousel,
    GithubCard,
    GridCard,
    GridRow,
    LeaderboardCell,
    LeaderboardLanguage,
    LeaderboardUser
  }
})
export default class Home extends Vue {
  // Set the default in the modules itself, not here: companyCount = 0;
  // Will result in permanent value.
  @State('nextCursor', Namespace.user) nextCursor?: string;
  @State('companyCount', Namespace.user) companyCount?: number;
  @State('userCountByYears', Namespace.user) userCountByYears?: Leaderboard[];
  @State('users', Namespace.user) users?: User[];
  @State('userCount', Namespace.user) userCount?: number;
  @State('leaderboardRepositoryByYears', Namespace.repo) leaderboardRepositoryByYears?: Leaderboard[];
  @State('leaderboardRepository', Namespace.repo) leaderboardRepository?: Leaderboard[];
  @State('leaderboardUser', Namespace.repo) leaderboardUser?: Leaderboard[];
  @State('leaderboardLanguage', Namespace.repo) leaderboardLanguage?: Leaderboard[];
  @State('maxLanguageCount', Namespace.repo) maxLanguageCount?: number;
  @State('totalLanguageCount', Namespace.repo) totalLanguageCount?: number;

  @State('githubUri') githubUri?: string;

  @Action('fetchUsers', Namespace.user) fetchUsers: any;
  @Action('fetchCompanyCount', Namespace.user) fetchCompanyCount: any;
  @Action('fetchUserCountByYears', Namespace.user) fetchUserCountByYears: any;
  @Action('fetchRecommendations', Namespace.user) fetchRecommendations: any;

  @Action('fetchRepositoriesByYears', Namespace.repo) fetchRepositoriesByYears: any
  @Action('fetchLeaderboardRepository', Namespace.repo) fetchLeaderboardRepository: any
  @Action('fetchLeaderboardLanguage', Namespace.repo) fetchLeaderboardLanguage: any
  @Action('fetchLeaderboardUser', Namespace.repo) fetchLeaderboardUser: any

  @Getter('leaderboardUserWithStats', Namespace.repo) leaderboardUserWithStats: any;
  @Getter('recommendations', Namespace.user) recommendations?: Score[];
  @Getter('getUser') getUser?: any;

  throttle: any;
  throttleSearch: any;
  keyword: string = '';
  keywordGhost: string = '';
  async mounted() {
    await this.fetchUsers()
    await this.fetchUserCountByYears()

    await this.fetchRepositoriesByYears()
    await this.fetchCompanyCount()

    await this.fetchLeaderboardUser()
    await this.fetchLeaderboardRepository()
    await this.fetchLeaderboardLanguage()
    // await this.fetchRecommendations('alextanhongpin')
  }
  async scroll (scrollEnd: boolean) {
    if (scrollEnd) {
      if (this.throttle) {
        window.clearTimeout(this.throttle)
      }
      this.throttle = window.setTimeout(() => {
        this.fetchUsers(this.nextCursor)
      }, 250)
    }
  }

  search (evt: EventTarget) {
    const keyword = evt.currentTarget.value
    this.keywordGhost = keyword
    if (keyword.trim().length) {
      this.throttleSearch && window.clearTimeout(this.throttleSearch)
      this.throttleSearch = window.setTimeout(async () => {
        this.keyword = this.keywordGhost
        await this.fetchRecommendations(this.keyword)
      }, 250)
    }
  }
  get searchUser () : User|undefined {
    const user = this.getUser(this.keyword)
    console.log('got', user)
    return user
  }
  githubLink (user: string): string {
    return [this.githubUri, user].join('/')
  }
}
</script>
<style lang='scss'>
@import '@/styles/theme.scss';

.leaderboard-user {
  padding: $dim-300;
  margin: $dim-300;
  box-shadow: 0 5px 15px rgba(black, .2);
  border-radius: 11px;
}
.leaderboard-user__header {
  font-weight: bold;
  @extend %h5;
}
.leaderboard-user__subheader {
  font-weight: 600; // Semibold;
  color: #818181;
  @extend %h6;
}

.search-wrapper {
  padding: 0 $dim-300;
}
$search-dim: $dim-600;
$search-half-dim: #{$search-dim/2};
.search {
  height: $search-dim;
  border: none;
  background: $color-gray;
  border-radius: $search-half-dim;
  padding: 0 $search-half-dim;
  @extend %h5;
  width: 100%;
  max-width: 360px;
}

.recommend-section {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-column-gap: $dim-100;
  align-items: flex-start;
  margin: 21px;
}
.recommend {
  display: grid;
  grid-template-columns: $dim-500 1fr;
  grid-column-gap: $dim-50;
  padding: $dim-50;
  border-radius: $dim-50;
  text-decoration: none;
  color: inherit;
}
.recommend:hover {
  background: #EEEEEE;
}

.recommend-photo {
  height: $dim-500;
  width: auto;
  background: $color-silverlake;
  border-radius: 50%;
  vertical-align: middle;
}
// For ellipsis to work in the grid-layout, apply it to the parent container;
.recommend-info {
  overflow: hidden;
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
  grid-row-gap: $dim-50;
}
</style>
