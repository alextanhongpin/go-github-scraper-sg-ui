<template>
  <div class="home">
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

    <div class='leaderboard-language'>
      <h3>Leaderboard User</h3>
      <br/>
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
import GithubCard from '@/components/GithubCard.vue'
import GridCard from '@/components/GridCard.vue'
import Carousel from '@/components/Carousel.vue'
import LeaderboardCell from '@/components/LeaderboardCell.vue'
import LeaderboardLanguage from '@/components/LeaderboardLanguage.vue'
import LeaderboardUser from '@/components/LeaderboardUser.vue'
import GridRow from '@/components/GridRow.vue'

import { Leaderboard, User } from '@/models'
import { Action, Getter, State } from 'vuex-class'
import { Namespace } from '@/models'

@Component({
  components: {
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
  @Action('fetchRepositoriesByYears', Namespace.repo) fetchRepositoriesByYears: any
  @Action('fetchLeaderboardRepository', Namespace.repo) fetchLeaderboardRepository: any
  @Action('fetchLeaderboardLanguage', Namespace.repo) fetchLeaderboardLanguage: any
  @Action('fetchLeaderboardUser', Namespace.repo) fetchLeaderboardUser: any

  @Getter('leaderboardUserWithStats', Namespace.repo) leaderboardUserWithStats: any;

  throttle: any;
  async mounted() {
    await this.fetchUsers()
    await this.fetchUserCountByYears()

    await this.fetchRepositoriesByYears()
    await this.fetchCompanyCount()

    await this.fetchLeaderboardUser()
    await this.fetchLeaderboardRepository()
    await this.fetchLeaderboardLanguage()
  }
  async scroll (scrollEnd: boolean) {
    if (scrollEnd) {
      if (this.throttle) {
        window.clearTimeout(this.throttle)
      }
      this.throttle = window.setTimeout(() => {
        console.log(this.nextCursor, 'throttle')
        this.fetchUsers(this.nextCursor)
      }, 250)
    }
  }
}
</script>
<style lang='scss'>
.leaderboard-language {
  padding: 20px;
  margin: 20px;
  box-shadow: 0 10px 25px rgba(black, .15);
  border-radius: 11px;
}
</style>
