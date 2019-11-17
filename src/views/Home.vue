<template>
  <div class="home">
    <recommendation />
    <break :px="33" />

    <h2>GitHub Stats</h2>
    <language-section />
    <break :px="33" />

    <div class="leaderboard-user-section">
      <h3>Top Active Users</h3>
      <h5>
        Based on Repository owned count, excluding forks.
      </h5>

      <leaderboard-user
        v-bind="user"
        v-for="(user, i) in leaderboardUserWithStats"
        :key="user.login"
        :i="i"
      />
    </div>
    <break :px="33" />

    <leaderboard-company />
    <break :px="33" />

    <leaderboard-language
      :totalCount="totalLanguageCount"
      :items="leaderboardLanguage"
    />
    <break :px="33" />

    <year-over-year-user-chart />
    <break :px="33" />

    <year-over-year-repository-chart />
    <break :px="33" />
  </div>
</template>

<script lang="ts">
// HINT: Use v-bind to spread the objects as props in the component.
// HINT: @ is an alias to /src
// HINT: Add static images. <img alt="Vue logo" src="../assets/logo.png">
import { Component, Vue } from 'vue-property-decorator'
import { Score, Leaderboard, User } from '@/types'
import { Action, Getter, State } from 'vuex-class'
import Namespace from '@/models/namespace'

// Components.
import Break from '@/components/Break.vue'

const LeaderboardLanguage = () => import('@/components/LeaderboardLanguage.vue')
const LeaderboardCompany = () => import('@/components/LeaderboardCompany.vue')
const LeaderboardUser = () => import('@/components/LeaderboardUser.vue')
const Recommendation = () =>
  import('@/components/recommendation/Recommendation.vue')

const YearOverYearUserChart = () =>
  import('@/components/leaderboard/YearOverYearUserChart.vue')
const YearOverYearRepositoryChart = () =>
  import('@/components/leaderboard/YearOverYearRepositoryChart.vue')
const LanguageSection = () =>
  import('@/components/language/LanguageSection.vue')

@Component({
  components: {
    Break,
    LeaderboardUser,
    LeaderboardLanguage,
    LeaderboardCompany,
    YearOverYearUserChart,
    YearOverYearRepositoryChart,
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

  // Actions.
  @Action('fetchUsers', Namespace.user) fetchUsers: any
  @Action('fetchCompanyCount', Namespace.user) fetchCompanyCount: any

  @Action('fetchLeaderboardRepository', Namespace.repo)
  fetchLeaderboardRepository: any
  @Action('fetchLeaderboardLanguage', Namespace.repo)
  fetchLeaderboardLanguage: any
  @Action('fetchLeaderboardUser', Namespace.repo) fetchLeaderboardUser: any

  // Getters.
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

.leaderboard-user-section {
  padding: $dim-400;
  border-radius: $dim-100;
  box-shadow: 0 5px 15px rgba(black, 0.2);
}
</style>
