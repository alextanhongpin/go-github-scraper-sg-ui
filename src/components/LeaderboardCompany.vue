<template>
  <div>
    <h3>Top Companies</h3>
    <div
      v-for="company in companies"
      :key="company.name"
      @click="selectCompany(company.name)"
    >
      {{ company.name }} <b>{{ company.count }}</b> Users
    </div>
    <div class="users">
      <a v-for="user in users" :key="user.login">
        <user-tile v-bind="user" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { User, Leaderboard } from '@/types'

import Namespace from '@/models/namespace'
import UserTile from '@/components/UserTile.vue'

@Component({
  components: {
    UserTile
  }
})
export default class LeaderboardCompany extends Vue {
  @Action('fetchTopCompanies', Namespace.user) fetchTopCompanies: any
  @Action('fetchCompanyUsers', Namespace.user) fetchCompanyUsers: any

  @Getter('companies', Namespace.user) companies: Leaderboard[]
  @Getter('companyUsers', Namespace.user) users: User[]

  mounted () {
    this.fetchTopCompanies()
  }

  selectCompany (name: string) {
    this.fetchCompanyUsers(name)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.users {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: $dim-100;
  grid-row-gap: $dim-100;
}
</style>
