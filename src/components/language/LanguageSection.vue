<template>
  <div class="language-section" @click.self="toggleDropdown">
    <h3>
      Top Users by Languages
    </h3>
    <break />

    <div class="language-tags">
      <p
        class="language-tag"
        v-for="tag in languageTags"
        :key="tag"
        :class="{ 'is-selected': tag === language }"
        @click="selectTag(tag)"
      >
        {{ tag }}
      </p>
    </div>

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
        <div class="user-position">{{ i + 1 }}.</div>
        <div class="user-info">
          <div>
            <img class="user-photo" :src="user.user.avatarUrl" />
            <div class="user-name">
              {{ user.user.login }}
              <trophy-icon
                :name="['gold', 'silver', 'bronze'][i]"
                v-if="i < 3"
              />
            </div>
          </div>
          <div class="counter">
            <b>{{ user.count }}</b> Repos
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, State, Getter } from 'vuex-class'
import { LeaderboardUserLanguage } from '@/types'
import Namespace from '@/models/namespace'

import Break from '@/components/Break.vue'
import Dropdown from '@/components/Dropdown.vue'
import TrophyIcon from '@/components/TrophyIcon.vue'

@Component({
  components: {
    Break,
    Dropdown,
    TrophyIcon
  }
})
export default class LanguageSection extends Vue {
  language: string = 'JavaScript'

  @Action('fetchLanguages', Namespace.language) fetchLanguages: any
  @Action('fetchLeaderboardUserByLanguage', Namespace.language)
  fetchLeaderboardUserByLanguage: any
  @State('languages', Namespace.language) languages?: string[]
  @State('users', Namespace.language) users?: Leaderboard[]
  @Getter('topLanguages', Namespace.repo) topLanguages?: Leaderboard[]

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

  selectTag (tag: string) {
    this.language = tag
    this.fetchUsers()
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

  get languageTags (): string[] {
    return this.topLanguages.slice(0, 20).map(language => language.name)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
// The scoped must be at the end.
.language-section {
  position: relative;
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
  grid-template-columns: max-content 1fr max-content;
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
  grid-template-columns: 1fr max-content;
  justify-content: space-between;
  align-items: center;
  .counter {
    margin: 0 $dim-100;
  }
}
.user:nth-child(2n + 1) {
  background: #f7f7f7;
}
.user:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.user-photo {
  height: $dim-500;
  width: auto;
  background: white;
  border-radius: 11px;
  display: inline-block;
  vertical-align: middle;
}

.user-name {
  display: inline-block;
  vertical-align: middle;
  padding: 0 $dim-50;
}

.language-tag {
  background: #eee;
  border-radius: 3px;
  display: inline-block;
  margin: 0 $dim-100 $dim-100 0;
  cursor: pointer;
  min-width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding: 0 $dim-100;
}
.language-tag:hover {
  background: #ddd;
}
.language-tag.is-selected {
  background: #333;
  color: white;
}
</style>
