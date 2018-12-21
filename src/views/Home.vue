<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <GithubCard :user="user" v-for="user in users"/>
    <LeaderboardCell v-bind="user" v-for="user in leaderboardUsers"/>
  </div>
</template>

<script lang="ts">
// HINT: Use v-bind to spread the objects as props in the component.
// HINT: @ is an alias to /src

import { Component, Vue } from 'vue-property-decorator'

import GithubCard from '@/components/GithubCard.vue'
import LeaderboardCell from '@/components/LeaderboardCell.vue'

import { UserApi } from '@/apis'
import { Leaderboard, User } from '@/models'

@Component({
  components: {
    GithubCard,
    LeaderboardCell
  }
})
export default class Home extends Vue {
    users: User[] = []
    leaderboardUsers: Leaderboard[] = []

    async mounted() {
      try {
        const { users, pageInfo } = await UserApi.getUsers()
        this.users = users
      } catch(error) {
        console.log(error)
      }
      try {
        const leaderboardUsers = await UserApi.getUserCountByYears()
        this.leaderboardUsers = leaderboardUsers
      } catch (error) {
        console.log(error)
      }
    }
}
</script>
