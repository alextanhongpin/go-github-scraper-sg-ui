<template>
  <div class="leaderboard-company">
    <h3>Top Companies</h3>
    <div class="search-container">
      <div>
        <input
          class="search"
          type="search"
          @keyup="keyup"
          v-model="keyword"
          placeholder="Search Company, e.g. Google"
        />
      </div>
      <dropdown v-if="showDropdown" :items="searchResults">
        <div slot-scope="{ item }" @click.self="selectCompany(item)">
          {{ item }}
        </div>
      </dropdown>
    </div>

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
import Dropdown from '@/components/Dropdown.vue'
import UserTile from '@/components/UserTile.vue'

@Component({
  components: {
    Dropdown,
    UserTile
  }
})
export default class LeaderboardCompany extends Vue {
  @Action('fetchTopCompanies', Namespace.user) fetchTopCompanies: any
  @Action('fetchCompanyUsers', Namespace.user) fetchCompanyUsers: any
  @Action('searchCompany', Namespace.company) searchCompany: any

  @Getter('companies', Namespace.user) companies: Leaderboard[]
  @Getter('companyUsers', Namespace.user) users: User[]
  @Getter('searchResults', Namespace.company) searchResults: string[]

  keyword: string = ''

  mounted () {
    this.fetchTopCompanies()
  }

  get showDropdown (): boolean {
    const hasKeyword = this.keyword && this.keyword.length
    const hasSearchResults = this.searchResults && this.searchResults.length
    return hasKeyword && hasSearchResults
  }

  selectCompany (name: string) {
    this.keyword = ''
    this.fetchCompanyUsers(name)
  }

  keyup (evt: Event) {
    const keyword = evt.currentTarget.value
    this.searchCompany(keyword)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.leaderboard-company {
  position: relative;
}

.users {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: $dim-100;
  grid-row-gap: $dim-100;
}

.search-container {
  position: absolute;
  max-width: 240px;
  width: 100%;
  top: 0;
  right: $dim-100;
}

.search {
  @extend %h5;
  width: 100%;
  height: $dim-600;
  background: #eee;
  border: 1px solid #ddd;
  border-radius: #{$dim-600/2};
  padding: 0 #{$dim-600/2};
}
</style>
