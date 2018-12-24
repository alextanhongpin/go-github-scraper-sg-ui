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
        <div>
          {{repositoryCount}} repo with {{languageCount}} languages
        </div>
      </div>
    </div>

    <div class='info'>
      <div class='language' v-for='language in topThreeLanguage'>
        <div
          class='icon-language'
          :style='{background: color(language.name)}'
        ></div>
        <div>{{language.count}}</div>
        <div>{{language.name}}</div>
        <div>{{percentage(language.count, repositoryCount)}}</div>
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
  @State('githubUri') githubUri: string;
  @Prop() private user?: User;
  @Prop({default: 0}) private repositoryCount!: number;
  @Prop() private languages?: Leaderboard[];

  get languageCount (): count {
    return this.languages.length
  }

  get topThreeLanguage (): Leaderboard[] {
    return this.languages.slice(0, 3)
  }

  get githubLink (): string {
    return [this.githubUri, this.user.login].join('/')
  }

  percentage (count: number): number {
    return count / this.repositoryCount * 100
  }

  color (color: string): string {
    return Color.pick(color)
  }
}
</script>
<style scoped lang='scss'>

.container {
  border-bottom: 1px solid #EEE;
  display: grid;
  grid-template-columns: minmax(120px, 240px) 1fr;
  grid-column-gap: 10px;
  text-decoration: none;
  color: inherit;
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

.name {
  font-weight: bold;
}

.language {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.icon-language {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: relative;
}

</style>
