<template>
  <router-link class="leaderboard-user" :to="githubLink">
    <div class="aside">
      <div class="header">
        <div class="user-image">
          <img :src="user.avatarUrl" width="100%" height="auto" />
        </div>
        <div>
          <h5 class="user-name">
            {{ user.login }}
            <trophy-icon
              :name="['gold', 'silver', 'bronze'][i]"
              v-if="i < 3"
            ></trophy-icon>
          </h5>
          <h6 class="user-connections">
            <span>
              <b>{{ user.followers }}</b> Followers
            </span>
            |
            <span>
              <b>{{ user.following }}</b> Following
            </span>
          </h6>
        </div>
      </div>
    </div>

    <div>
      <div class="top-languages">
        <language-cell
          v-for="language in topThreeLanguage"
          :label="language.name"
          class="language"
          :key="language.name"
        >
          ({{ percentage(language.count, count) }})
        </language-cell>
      </div>

      <div class="counters">
        <div>
          <b>{{ count }}</b> Repositories
        </div>
        <div>
          <b>{{ user.gists }}</b> Gists
        </div>
        <div>
          <b>{{ languageCount }}</b> Languages
        </div>
        <div>
          <b>{{ forkedRepoCount }}</b> Forked Repo
        </div>
      </div>
    </div>
  </router-link>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { User, Leaderboard } from '@/types'
import * as Color from '@/helpers/color'

import Break from '@/components/Break.vue'
import LanguageCell from '@/components/LanguageCell.vue'
import TrophyIcon from '@/components/TrophyIcon.vue'

@Component({
  components: {
    Break,
    LanguageCell,
    TrophyIcon
  }
})
export default class LeaderboardUser extends Vue {
  @Prop() private user?: User
  @Prop() i?: number
  @Prop() private languages: Leaderboard[] = []
  @Prop() private count: number = 0

  get languageCount (): number {
    return this.languages ? this.languages.length : 0
  }

  get topThreeLanguage (): Leaderboard[] {
    return this.languages ? this.languages.slice(0, 3) : []
  }

  get githubLink (): string {
    const login = this.user && this.user.login
    return login ? '/' + login : '/'
  }

  get forkedRepoCount (): number {
    return this.user ? Math.max(0, this.user.repositories - this.count) : 0
  }

  percentage (count: number): string {
    return ((count / this.count) * 100).toFixed(1) + '%'
  }

  color (color: string): string {
    return Color.pick(color)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.leaderboard-user {
  text-decoration: none;
  color: inherit;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: $dim-100;
  grid-row-gap: $dim-100;
  align-items: center;
  padding: $dim-100;
  border-radius: 5px;
}
.leaderboard-user:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.leaderboard-user:hover {
  background: #f7f7f7;
}

@media (max-width: 800px) {
  .leaderboard-user {
    grid-template-columns: 1fr;
  }
}

.header {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: $dim-100;
  align-items: center;
}

.user-image {
  height: 40px;
  width: 40px;
  border-radius: 3px;
  overflow: hidden;
  background: #ddd;
}
.user-name {
  font-weight: bold;
}
.repo-count {
  color: #818181;
}

.counters {
  @extend %h6;
  display: grid;
  color: #818181;
  grid-template-columns: repeat(4, max-content);
  grid-column-gap: $dim-200;
  align-items: center;
}

.top-languages {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-column-gap: $dim-100;
  align-items: center;
}
.language {
  @extend %h6;
  display: grid;
  align-items: center;
  grid-template-columns: max-content 1fr;
}

.user-connections {
  color: #818181;
}
</style>
