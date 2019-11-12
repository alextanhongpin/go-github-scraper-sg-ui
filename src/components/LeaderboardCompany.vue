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
        <div
          class="ellipsis"
          slot-scope="{ item }"
          @click.self="selectCompany(item)"
          :title="item"
        >
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

    <h4 v-if="selected">
      <b>{{ pagination.total }}</b> search results for <b>{{ selected }}</b>
    </h4>
    <break />

    <div v-if="!colleagues.length">
      No search results
    </div>
    <div v-else>
      <div class="users">
        <router-link
          v-for="colleague in colleagues"
          :key="colleague.login"
          :to="'/' + colleague.login"
          class="nolink"
        >
          <user-tile v-bind="colleague" />
        </router-link>
      </div>

      <break />
      <div v-if="!pagination.onlyPage" class="pagination">
        <button
          class="button button-next"
          :disabled="!pagination.hasPrevPage"
          @click="prev"
        >
          Prev
        </button>
        <div>
          <input
            class="page-input"
            type="number"
            :value="pagination.current"
            @change="inputPage"
          />
          /
          <b>{{ pagination.pages }}</b>
        </div>
        <button
          class="button button-prev"
          :disabled="!pagination.hasNextPage"
          @click="next"
        >
          Next
        </button>
      </div>
      <break />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { User, Leaderboard, Page } from '@/types'
import { offsetToPage, pageToOffset, paginate, newPage } from '@/models/page'

import Namespace from '@/models/namespace'
import Dropdown from '@/components/Dropdown.vue'
import UserTile from '@/components/UserTile.vue'
import Break from '@/components/Break.vue'

@Component({
  components: {
    Break,
    Dropdown,
    UserTile
  }
})
export default class LeaderboardCompany extends Vue {
  @Action('fetchTopCompanies', Namespace.user) fetchTopCompanies: any
  @Action('searchCompany', Namespace.company) searchCompany: any
  @Action('searchColleague', Namespace.company) searchColleague: any

  @Getter('companies', Namespace.user) companies: Leaderboard[] = []
  @Getter('companyUsers', Namespace.user) users: User[] = []
  @Getter('page', Namespace.company) page: Page = newPage()
  @Getter('searchResults', Namespace.company) searchResults: string[] = []
  @Getter('colleagues', Namespace.company) colleagues: string[] = []

  keyword: string = ''
  selected: string = ''

  get showDropdown (): boolean {
    const hasKeyword = this.keyword && this.keyword.length > 0
    const hasSearchResults = this.searchResults && this.searchResults.length > 0
    return !!(hasKeyword && hasSearchResults)
  }

  selectCompany (company: string) {
    this.keyword = ''
    this.selected = company
    this.searchColleague({ company, limit: this.page.limit, offset: 0 })
  }

  keyup (evt: Event) {
    const company = (evt.currentTarget as HTMLInputElement).value
    this.searchCompany(company)
  }

  get pagination () {
    const { limit, offset, total } = this.page
    const page = offsetToPage(limit, offset)
    const perPage = limit
    return paginate(total, page, perPage)
  }

  next () {
    const company = this.selected
    const limit = this.page.limit
    const offset = pageToOffset(limit, this.pagination.next)
    this.searchColleague({ company, limit, offset })
  }

  prev () {
    const company = this.selected
    const limit = this.page.limit
    const offset = pageToOffset(limit, this.pagination.prev)
    this.searchColleague({ company, limit, offset })
  }

  inputPage (evt: Event) {
    const value = parseInt((evt.currentTarget as HTMLInputElement).value)
    const page = isNaN(value) ? 1 : value
    const { limit, total } = this.page

    const perPage = limit
    const pagination = paginate(total, page, perPage)
    const company = this.selected
    const offset = pageToOffset(limit, pagination.page)
    this.searchColleague({ company, limit, offset })
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

.button {
  appearance: none;
  webkit-appearance: none;
  min-height: $dim-600;
  min-width: $dim-600;
  padding: 0 $dim-100;
  @extend %h5;
  border-radius: 3px;
}

.page-input {
  min-height: $dim-600;
  max-width: #{$dim-600 * 1.5};
  text-align: center;
}

.pagination {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-column-gap: $dim-100;
  align-items: center;
  justify-content: flex-end;
}
</style>
