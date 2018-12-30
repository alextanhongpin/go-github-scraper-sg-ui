<template>
  <a class='container' :href='githubLink' target='_blank'>
    <div class='aside'>
      <div class='header'>
        <div class='image'>
          <img :src='user.avatarUrl' width='100%' height='auto'/>
        </div>
        <div>
          <div class='name' v-if='user'>
            {{user.login}}
          </div>
          <div class='repo-count' title='Repositories that are not forked'>
            {{repositoryCount}} repos
          </div>
        </div>
      </div>
      <Break/>
      <h6>
        <div>
          {{user.location}}
        </div>
      </h6>
    </div>

    <div>
      <div class='info'>
        <div class='info-header'>
          Top 3 Languages
        </div>
        <LanguageCell
          v-for='language in topThreeLanguage'
          :label='language.name'
          class='language'
        >
          ({{percentage(language.count, repositoryCount)}})
        </LanguageCell>
      </div>
      <Break/>
      <div class='counters'>
        <div class='counter-item'>
          <i class='counter'>{{languageCount}}</i> languages
        </div>
        <div class='counter-item'>
          <i class='counter'>{{user.gists}}</i> gists
        </div>
        <div class='counter-item'>
          <i class='counter'>{{forkedRepoCount}}</i> forked repos
        </div>
        <div class='counter-item'>
          <i class='counter'>{{user.followers}}</i> followers
        </div>
        <div class='counter-item'>
          <i class='counter'>{{user.following}}</i> following
        </div>
      </div>
    </div>
  </a>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { User, Leaderboard } from '@/models'
import * as Color from '@/helpers/color'

import Break from '@/components/Break.vue'
import LanguageCell from '@/components/LanguageCell.vue'

@Component({
  components: {
    Break,
    LanguageCell
  }
})
export default class LeaderboardUser extends Vue {
  @State('githubUri') githubUri?: string;
  @Prop() private user?: User;
  @Prop({ default: [] }) private languages?: Leaderboard[];
  @Prop({ default: 0 }) private repositoryCount?: number;

  get languageCount (): number {
    return this.languages
      ? this.languages.length
      : 0
  }

  get topThreeLanguage (): Leaderboard[] {
    return this.languages
      ? this.languages.slice(0, 3)
      : []
  }

  get githubLink (): string {
    return this.user
      ? [this.githubUri, this.user.login].join('/')
      : ''
  }

  get forkedRepoCount (): number {
    return this.user
      ? this.user.repositories - this.repositoryCount
      : 0
  }

  percentage (count: number): string {
    return (count / this.repositoryCount * 100).toFixed(1) + '%'
  }

  color (color: string): string {
    return Color.pick(color)
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/theme.scss';

.container {
  border-bottom: 1px solid #EEE;
  display: grid;
  grid-template-columns: minmax(120px, 240px) 1fr;
  grid-column-gap: 10px;
  text-decoration: none;
  color: inherit;
  padding: $dim-100 0;
  position: relative;
}
$container-hover-color: #EEEEEE;
.container:hover {
  background: $container-hover-color;
}

.container:hover::before {
  content: '';
  position: absolute;
  left: -$dim-100;
  top: 0;
  height: 100%;
  width: $dim-100;
  background: $container-hover-color;
  z-index: 1000;
  border-radius: 5px 0 0 5px;
}
.header {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-column-gap: 10px;
}

.image {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #DDD;
}

.name { }
.repo-count {
  @extend %h6;
  color: #818181;
  font-weight: 600;
  text-transform: uppercase;
}

.info {
  display: grid;
  // grid-auto-flow: column;
  justify-content: flex-start;
  grid-column-gap: $dim-100;
}
.info-header {
  @extend %h6;
  color: #818181;
  font-weight: 600;
  text-transform: uppercase;
}

.language {
  @extend %h6;
  display: grid;
  grid-template-columns: $dim-100 1fr;
  grid-column-gap: 5px;
  align-items: center;
}

.language-icon {
  height: $dim-100;
  width: $dim-100;
  border-radius: 50%;
  position: relative;
  display: inline-block;
}

.language-label {
  display: inline-block;
}

.counters {
  width: 100%;
  @extend %h6;
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  grid-column-gap: $dim-100;
}

.counter {
  display: inline-block;
  padding: 0 $dim-50;
  background: $color-alto;
  font-size: $dim-50;
  border-radius: 5px;
}
</style>
