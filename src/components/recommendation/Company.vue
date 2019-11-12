<template>
  <div v-if="countExcludingYourself">
    <h3>Your Colleagues</h3>
    <p>
      <b>{{ countExcludingYourself }}</b>
      {{ countExcludingYourself === 1 ? 'User' : 'Users' }}
    </p>
    <break />

    <div class="colleagues">
      <router-link
        class="nolink"
        v-for="c in myColleagues"
        :key="c.login"
        :to="githubLink(c.login)"
      >
        <user-tile v-bind="c"></user-tile>
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
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Action, Getter, State } from 'vuex-class'

import { User, Page } from '@/types'

import Namespace from '@/models/namespace'
import { offsetToPage, pageToOffset, paginate, newPage } from '@/models/page'

import Break from '@/components/Break.vue'
import UserTile from '@/components/UserTile.vue'

@Component({
  components: {
    Break,
    UserTile
  }
})
export default class Company extends Vue {
  @Action('searchYourColleague', Namespace.company) searchColleague: any
  @Getter('yourColleagues', Namespace.company) colleagues!: User[]
  @Getter('yourPage', Namespace.company) page!: Page

  @Prop() user!: User
  @Watch('user')
  onUserChanged (val: User, oldVal: User) {
    this.searchColleague({ company: val.company, limit: 20 })
  }

  mounted () {
    this.searchColleague({ company: this.user.company, limit: 20 })
  }

  get myColleagues (): User[] {
    const login = this.user && this.user.login
    if (!login) return []
    return this.colleagues.filter(user => user.login !== login)
  }

  get yourself (): boolean {
    const login = this.user && this.user.login
    return !!this.colleagues.find(user => user.login === login)
  }

  // The search results for users in a company includes yourself. Exclude them
  // from the actual calculation.
  get countExcludingYourself (): number {
    const count = this.yourself ? 1 : 0
    return this.page.total - count
  }

  githubLink (login: string): string {
    return `/${login}`
  }

  get company (): string {
    return this.user.company || ''
  }

  get pagination () {
    const { limit, offset, total } = this.page
    const page = offsetToPage(limit, offset)
    const perPage = limit
    return paginate(total, page, perPage)
  }

  next () {
    const company = this.company
    const limit = this.page.limit
    const offset = pageToOffset(limit, this.pagination.next)
    this.searchColleague({ company, limit, offset })
  }

  prev () {
    const company = this.company
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
    const company = this.company
    const offset = pageToOffset(limit, pagination.page)
    this.searchColleague({ company, limit, offset })
  }
}
</script>
<style lang="scss">
@import '@/styles/theme.scss';

.colleagues {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: $dim-100;
  grid-row-gap: $dim-100;
}

.colleague {
  display: block;
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
