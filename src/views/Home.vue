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

    <div class='recommend' v-for='recommendation in recommendations(keyword)'>
      <div class='recommend-photo'></div>
      {{recommendation.name}}
      {{recommendation.score}}
    </div>

    <div class='leaderboard-user'>
      <div class='leaderboard-user__header'>Top Active Users</div>
      <Break px='5'/>
      <div class='leaderboard-user__subheader'>
        IN MALAYSIA AND SINGAPORE
      </div>
      <Break px='12'/>

      <LeaderboardUser v-bind="data" v-for="data in leaderboardUserWithStats"/>
    </div>

    <h3>Leaderboard Language</h3>
    <GridRow>
    <LeaderboardLanguage :maxCount='maxLanguageCount' v-bind="data" v-for="data in leaderboardLanguage"/>
    </GridRow>

    <h3>Leaderboard Repositories</h3>
    <LeaderboardCell v-bind="data" v-for="data in leaderboardRepository"/>
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

  throttle: any;
  throttleSearch: any;
  keyword: string = '';
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
    if (keyword.trim().length) {
      this.throttleSearch && window.clearTimeout(this.throttleSearch)
      this.throttleSearch = window.setTimeout(async () => {
        this.keyword = keyword
        await this.fetchRecommendations(keyword)
      }, 250)
    }
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
.recommend-photo {
  width: 40px;
  height: 40px;
  background: #818181;
}
</style>
