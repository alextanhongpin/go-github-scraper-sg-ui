<template>
  <div class='language-section' @click.self='toggleDropdown'>
    <div class='language-section-header'>
      Most Repos by Language
    </div>
    <Break/>
    <div class='languages'>
      <div>
        <input class='search' type='search' :value='language' @keyup='search'/>
      </div>
      <Dropdown
        v-if='showDropdown'
        :items='searchLanguages'
      >
      <div slot-scope='{item}' @click.self='select(item)'>{{item}}</div>
      </Dropdown>
    </div>
    <div class='users'>
      <a
        v-for='(user, i) in users.slice(0, 10)'
        class='user'
        target='_blank'
        :href='"https://github.com/" + user.user.login'
        >
        <div class='user-position'>#{{i+1}}</div>
        <div class='user-info'>
          <div>
            <img class='user-photo' :src='user.user.avatarUrl'/>
            <div class='user-name'>
              {{user.user.login}}
            </div>
          </div>
          <Counter class='counter'>
            {{user.count}}
          </Counter>
        </div>
      </a>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { LeaderboardUserLanguage, Namespace } from '@/models'

import Break from '@/components/Break.vue'
import Counter from '@/components/Counter.vue'
import Dropdown from '@/components/Dropdown.vue'

@Component({
  components: {
    Break,
    Counter,
    Dropdown
  }
})
export default class LanguageSection extends Vue {
  language: string = 'JavaScript';

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
    if (language.length > 0 && language[0].toLowerCase() === keyword.toLowerCase()) {
      this.language = language[0]
      this.fetchUsers()
      return
    }
    this.language = keyword
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
@import '@/styles/theme.scss';
// The scoped must be at the end.
.language-section {
  position: relative;
  padding: 0 $dim-300;
  width: 100%;
}

.language-section-header {
  @extend %h4;
  font-weight: 600;
}

.languages {
  position: absolute;
  max-width: 240px;
  width: 100%;
  top: 0;
  right: $dim-100;
}

.search {
  @extend %h6;
  width: 100%;
  height: $dim-500;
  background: #DDD;
  border: none;
  border-radius: #{$dim-500/2};
  padding: 0 #{$dim-500/2};
}

.users {
  display: grid;
  grid-column-gap: $dim-50;
  grid-row-gap: $dim-50;
}
.user {
  text-decoration: none;
  color: inherit;
  border-radius: 11px;

  display: grid;
  grid-template-columns: $dim-500 minmax(max-content, 1fr);
}

$colors: #C98910, #A8A8A8, #965A38;
@for $i from 1 through 3 {
  .user:nth-child(#{$i}) .user-info {
    color: nth($colors, $i);
    background: rgba(nth($colors, $i), .15);
    font-weight: 600;
    .counter {
      background: nth($colors, $i);
      color: white;
    }
  }
}

.user-position {
  width: $dim-500;
  height: $dim-500;
  line-height: $dim-500;
  text-align: center;
}

.user-info {
  display: grid;
  border-radius: 11px;
  grid-template-columns: 1fr min-content;
  justify-content: space-between;
  align-items: center;
  .counter {
    margin: 0 $dim-100;
  }
}
.user:nth-child(2n+1) {
  background: #F7F7F7;
}

.user-photo {
  height: $dim-500;
  width: auto;
  border-radius: 11px;
  display: inline-block;
  vertical-align: middle;
}

.user-name {
  display: inline-block;
  vertical-align: middle;
  padding: 0 $dim-50;
}
</style>
