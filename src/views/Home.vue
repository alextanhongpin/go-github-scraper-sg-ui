<template>
  <div class="home">
    <Break />

    <Recommendation />

    <h3>Similar like you</h3>
    <Carousel v-on:scroll-horizontal="scroll" v-if="users.length">
      <GithubCard slot="carousel" :user="user" v-for="user in users" />
    </Carousel>

    <LanguageSection />

    <LeaderboardBarChartUser />
    <LeaderboardBarChartRepository />

    <!-- <h3>Company found</h3> -->
    <!-- <div> -->
    <!--   {{companyCount}} -->
    <!-- </div> -->

    <div class="leaderboard-user">
      <div class="leaderboard-user__header">Top Active Users</div>
      <Break px="5" />
      <div class="leaderboard-user__subheader">
        IN MALAYSIA AND SINGAPORE
      </div>
      <Break px="12" />
      <LeaderboardUser v-bind="data" v-for="data in leaderboardUserWithStats" />
    </div>

    <LeaderboardLanguage
      :totalCount="totalLanguageCount"
      :items="leaderboardLanguage"
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
import Recommendation from '@/components/recommendation/Recommendation.vue'

import LeaderboardBarChartUser from '@/components/leaderboard/LeaderboardBarChartUser.vue'
import LeaderboardBarChartRepository from '@/components/leaderboard/LeaderboardBarChartRepository.vue'
import GridRow from '@/components/GridRow.vue'
import LanguageSection from '@/components/language/LanguageSection.vue'

import { Score, Leaderboard, User } from '@/types'
import { Action, Getter, State } from 'vuex-class'
import Namespace from '@/models/namespace'

@Component({
  components: {
    Break,
    Carousel,
    GithubCard,
    GridCard,
    GridRow,
    LeaderboardCell,
    LeaderboardUser,
    LeaderboardLanguage,
    LeaderboardBarChartUser,
    LeaderboardBarChartRepository,
    Recommendation,
    LanguageSection
  }
})
export default class Home extends Vue {
  // Set the default in the modules itself, not here: companyCount = 0;
  // Will result in permanent value.
  @State('nextCursor', Namespace.user) nextCursor?: string
  @State('companyCount', Namespace.user) companyCount?: number
  @State('recommendations', Namespace.match) users?: User[]

  @State('leaderboardRepository', Namespace.repo)
  leaderboardRepository?: Leaderboard[]
  @State('leaderboardUser', Namespace.repo) leaderboardUser?: Leaderboard[]
  @State('leaderboardLanguage', Namespace.repo)
  leaderboardLanguage?: Leaderboard[]
  @State('maxLanguageCount', Namespace.repo) maxLanguageCount?: number
  @State('totalLanguageCount', Namespace.repo) totalLanguageCount?: number

  @State('githubUri') githubUri?: string

  @Action('fetchUsers', Namespace.user) fetchUsers: any
  @Action('fetchCompanyCount', Namespace.user) fetchCompanyCount: any

  @Action('fetchLeaderboardRepository', Namespace.repo)
  fetchLeaderboardRepository: any
  @Action('fetchLeaderboardLanguage', Namespace.repo)
  fetchLeaderboardLanguage: any
  @Action('fetchLeaderboardUser', Namespace.repo) fetchLeaderboardUser: any

  @Getter('leaderboardUserWithStats', Namespace.repo)
  leaderboardUserWithStats: any
  @Getter('getUser') getUser?: any

  throttle: any
  mounted () {
    this.fetchUsers()

    this.fetchCompanyCount()

    this.fetchLeaderboardUser()
    this.fetchLeaderboardRepository()
    this.fetchLeaderboardLanguage()
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

  githubLink (user: string): string {
    return [this.githubUri, user].join('/')
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.leaderboard-user {
  padding: $dim-300;
  margin: $dim-300;
  box-shadow: 0 5px 15px rgba(black, 0.2);
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
</style>
