<template>
  <a class='container' :href='githubLink' target='_blank'>
    <div class='header'>
      <div class='image'>
        <img :src='user.avatar_url' width='100%' height='auto'/>
      </div>
      <div>
        <div class='name' v-if='user'>
          {{user.login}}
        </div>
        <div class='repo-count'>
          {{repositoryCount}} REPO
        </div>
      </div>
    </div>

    <div class='info'>
      <div class='language' v-for='language in topThreeLanguage'>
          <div
            class='language-icon'
            :style='{background: color(language.name)}'
            ></div>
          <span class='language-label'>
            {{language.name}} ({{percentage(language.count, repositoryCount)}})
          </span>
        </div>
      </div>
    </div>
  </a>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { User, Leaderboard } from '@/models'
import { State } from 'vuex-class'
import * as Color from '@/helpers/color'

@Component
export default class LeaderboardUser extends Vue {
  @State('githubUri') githubUri?: string;
  @Prop() private user?: User;
  @Prop({ default: 0 }) private repositoryCount!: number;
  @Prop({ default: [] }) private languages?: Leaderboard[];

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

  percentage (count: number): string {
    return (count / this.repositoryCount * 100).toFixed(1) + '%'
  }

  color (color: string): string {
    return Color.pick(color)
  }
}
</script>
<style scoped lang='scss'>
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
}

.info {
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  grid-column-gap: $dim-100;
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

</style>
