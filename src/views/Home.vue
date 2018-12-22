<template>
  <div class="home">
    <Carousel>
      <GithubCard slot="carousel" :user="user" v-for="user in users"/>
    </Carousel>

    <h3>User created by Year</h3>
    <LeaderboardCell v-bind="user" v-for="user in leaderboardUserByYear"/>

    <h3>Company found</h3>
    <div>
      {{companyCount}}
    </div>

    <h3>Repositories created by Year</h3>
    <LeaderboardCell v-bind="data" v-for="data in leaderboardRepositoryByYear"/>

    <h3>Leaderboard User</h3>
    <LeaderboardCell v-bind="data" v-for="data in leaderboardUser"/>

    <h3>Leaderboard Language</h3>
    <LeaderboardCell v-bind="data" v-for="data in leaderboardLanguage"/>

    <h3>Leaderboard Repositories</h3>
    <LeaderboardCell v-bind="data" v-for="data in leaderboardRepository"/>
  </div>
</template>

<script lang="ts">
// HINT: Use v-bind to spread the objects as props in the component.
// HINT: @ is an alias to /src
// HINT: Add static images. <img alt="Vue logo" src="../assets/logo.png">
import { Component, Vue } from 'vue-property-decorator'

import GithubCard from '@/components/GithubCard.vue'
import GridCard from '@/components/GridCard.vue'
import Carousel from '@/components/Carousel.vue'
import LeaderboardCell from '@/components/LeaderboardCell.vue'

import { RepoApi, UserApi } from '@/apis'
import { Leaderboard, User } from '@/models'

@Component({
  components: {
    GithubCard,
    LeaderboardCell,
    GridCard,
    Carousel
  }
})
export default class Home extends Vue {
    users: User[] = []
    companyCount: number = 0

    leaderboardUserByYear: Leaderboard[] = []
    leaderboardRepositoryByYear: Leaderboard[] = []

    leaderboardRepository: Leaderboard[] = []
    leaderboardLanguage: Leaderboard[] = []
    leaderboardUser: Leaderboard[] = []

    async fetchUsers () {
      try {
        const { users, pageInfo } = await UserApi.getUsers()
        this.users = users
      } catch(error) {
        console.log(error)
      }
    }
    async fetchUsersByYears () {
        try {
          const data = await UserApi.getUserCountByYears()
          this.leaderboardUserByYear = data
        } catch (error) {
          console.log(error)
        }
    }
    async fetchRepositoriesByYears () {
        try {
          const data = await RepoApi.getRepositoryCountByYears()
          this.leaderboardRepositoryByYear = data
        } catch (error) {
          console.log(error)
        }
    }
    async fetchCompanyCount() {
        try {
          const count = await UserApi.getCompanyCount()
          this.companyCount = count
        } catch (error) {
          console.log(error)
        }
    }
    async fetchLeaderboardLanguage() {
        try {
          const data = await RepoApi.getLeaderboardLanguage()
          this.leaderboardLanguage = data
        } catch (error) {
          console.log(error)
        }
    }
    async fetchLeaderboardRepository() {
        try {
          const data = await RepoApi.getLeaderboardRepository()
          this.leaderboardRepository = data
        } catch (error) {
          console.log(error)
        }
    }
    async fetchLeaderboardUser() {
        try {
          const data = await RepoApi.getLeaderboardUser()
          this.leaderboardUser = data
        } catch (error) {
          console.log(error)
        }
    }
    async mounted() {
      await this.fetchUsers()
      await this.fetchUsersByYears()

      await this.fetchRepositoriesByYears()
      await this.fetchCompanyCount()

      await this.fetchLeaderboardUser()
      await this.fetchLeaderboardRepository()
      await this.fetchLeaderboardLanguage()
    }
}
</script>
