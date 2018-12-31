<template>
  <div class='language-section' @click.self='toggleDropdown'>
    <div class='languages'>
      <div>
        <input type='text' :value='language' @keyup='search'/>
      </div>
      <Dropdown
        v-if='showDropdown'
        :items='searchLanguages'
      >
      <div slot-scope='{item}' @click.self='select(item)'>{{item}}</div>
      </Dropdown>
    </div>
    <div v-for='user in users'>{{user.name}} {{user.count}}</div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { Leaderboard, Namespace } from '@/models'
import Dropdown from '@/components/Dropdown.vue'

@Component({
  components: {
    Dropdown
  }
})
export default class LanguageSection extends Vue {
  language: string = '';

  @Action('fetchLanguages', Namespace.language) fetchLanguages: any;
  @Action('fetchLeaderboardUserByLanguage', Namespace.language) fetchLeaderboardUserByLanguage: any;
  @State('languages', Namespace.language) languages?: string[];
  @State('users', Namespace.language) users?: Leaderboard[];

  mounted () {
    this.fetchLanguages()
    this.fetchUsers()
  }

  fetchUsers () {
    this.fetchLeaderboardUserByLanguage(this.language)
  }

  select (language: string) {
    this.language = language
    this.fetchUsers()
  }

  search (evt: KeyboardEvent) {
    const keyword = evt.target.value

    const language = this.filterLanguage(keyword)
    if (language.length === 1) {
      this.language = language[0]
      this.fetchUsers()
      return
    }
    this.language = keyword
  }
  exactMatch (language: string): string[] {
    return this.languages.filter(s => {
      return s.toLowerCase() === language.toLowerCase()
    })
  }
  filterLanguage (language: string): string[] {
    return this.languages.filter(s => {
      return s.toLowerCase().startsWith(language.toLowerCase())
    })
  }
  get searchLanguages (): string[] {
    return this.filterLanguage(this.language)
  }
  get showDropdown () {
    const hasLanguage = this.languages.includes(this.language)
    return !hasLanguage && this.language
  }
}
</script>
<style lang='scss' scoped>
// The scoped must be at the end.
.language-section {
  position: relative;
}
.languages {
  position: absolute;
  right: 0;
}
</style>
