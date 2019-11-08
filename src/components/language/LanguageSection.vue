<template>
  <div class="language-section" @click.self="toggleDropdown">
    <h3>
      Most Repos by Language
    </h3>

    <div class="languages">
      <div>
        <input class="search" type="search" :value="language" @keyup="search" />
      </div>
      <dropdown v-if="showDropdown" :items="searchLanguages">
        <div slot-scope="{ item }" @click.self="select(item)">{{ item }}</div>
      </dropdown>
    </div>

    <div class="users">
      <a
        v-for="(user, i) in users.slice(0, 10)"
        class="user"
        target="_blank"
        :href="'https://github.com/' + user.user.login"
        :key="user.user.login"
      >
        <div class="user-position">
          <i class="fa fa-trophy" v-if="i < 3"></i>
        </div>
        <div class="user-info">
          <div>
            <img class="user-photo" :src="user.user.avatarUrl" />
            <div class="user-name">
              {{ user.user.login }}
            </div>
          </div>
          <b class="counter">
            {{ user.count }}
          </b>
        </div>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { LeaderboardUserLanguage } from '@/types'
import Namespace from '@/models/namespace'

import Break from '@/components/Break.vue'
import Dropdown from '@/components/Dropdown.vue'

@Component({
  components: {
    Break,
    Dropdown
  }
})
export default class LanguageSection extends Vue {
  language: string = 'JavaScript'

  @Action('fetchLanguages', Namespace.language) fetchLanguages: any
  @Action('fetchLeaderboardUserByLanguage', Namespace.language)
  fetchLeaderboardUserByLanguage: any
  @State('languages', Namespace.language) languages?: string[]
  @State('users', Namespace.language) users?: Leaderboard[]

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
    if (
      language.length > 0 &&
      language[0].toLowerCase() === keyword.toLowerCase()
    ) {
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
<style lang="scss" scoped>
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
  @extend %h5;
  width: 100%;
  height: $dim-600;
  background: #eee;
  border: 1px solid #ddd;
  border-radius: #{$dim-600/2};
  padding: 0 #{$dim-600/2};
}

.users {
  display: grid;
  grid-column-gap: $dim-100;
}
.user {
  text-decoration: none;
  color: inherit;
  border-radius: 3px;

  display: grid;
  grid-template-columns: max-content minmax(max-content, 1fr);
}

$colors: #c98910, #a8a8a8, #965a38;
@for $i from 1 through 3 {
  .user:nth-child(#{$i}) .user-position {
    color: nth($colors, $i);
  }
}

.user-position {
  width: 48px;
  height: 48px;
  line-height: 48px;
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
.user:nth-child(2n + 1) {
  background: #f7f7f7;
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
