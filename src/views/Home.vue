<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <GithubCard :user="user" v-for='user in users'/>
  </div>
</template>

<script lang="ts">
// HINT: Use v-bind to spread the objects as props in the component.
// HINT: @ is an alias to /src

import { Component, Vue } from 'vue-property-decorator'
import GithubCard from '@/components/GithubCard.vue'
import * as UserApi  from '@/apis/user'

@Component({
  components: {
    GithubCard
  }
})
export default class Home extends Vue {
    users = []
    async mounted() {
      try {
        const {users, pageInfo } = await UserApi.getUsers()
        this.users = users
      } catch(error) {
        console.log(error)
      }
    }
}
</script>
