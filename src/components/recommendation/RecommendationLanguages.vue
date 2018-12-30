<template>
  <div class='component' v-if='user'>
    <div class='languages-header'>Repository</div>
    <Break/>
    <div class='languages-subheader'>
      <Counter>{{userLanguages.length}}</Counter> languages
      &nbsp;&nbsp;
      <Counter>{{user.repositories}}</Counter> repositories
    </div>
    <Break/>
    <div class='languages-body'>
      <LanguageCell
      v-for='item in userLanguages.slice(0,displayLanguageCount)'
      :label='item.name'
      class='language'
      >
      ({{formatPercentage(item.count)}}%)

      <span class='language-count'>
        {{item.count}} {{ item.count === 1 ? 'repo' : 'repos'}}
      </span>

      </LanguageCell>
    </div>
    <Break/>
    <div class='language-footer'>
      <button
        class='language-button-toggle'
        v-if='userLanguages.length > maxShowCount'
        @click='toggleLanguage'
        >
        {{displayLanguageLabel}}
      </button>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

// Components.
import Break from '@/components/Break.vue'
import Counter from '@/components/Counter.vue'
import LanguageCell from '@/components/LanguageCell.vue'

import {
  User,
  Namespace,
  Leaderboard
} from '@/models'

import { Action, Getter, State } from 'vuex-class'


@Component({
  components: {
    Break,
    Counter,
    LanguageCell
  }
})
export default class RecommendationLanguages extends Vue {
  displayLanguageCount: number = 5;
  displayLanguageLabel: string = 'Show All'

  // States.
  @State('searchUser', Namespace.user) user?: User;
  @State('searchUserLanguages', Namespace.user) userLanguages?: Leaderboard[];

  // Methods.
  formatPercentage (count: number): string {
    return (count / this.totalRepositoryCount * 100).toFixed(1)
  }

  toggleLanguage () {
    const totalCount = this.userLanguages.length
    const isPartial = this.displayLanguageCount === this.maxShowCount
    this.displayLanguageCount = isPartial
      ? totalCount
      : this.maxShowCount
    this.displayLanguageLabel = isPartial
      ? 'Show Less'
      : 'Show All'
  }

  // Getters.
  get totalRepositoryCount (): number {
    return this.userLanguages.reduce((acc: number, item: Leaderboard) => {
      return acc + item.count
    }, 0)
  }

  get maxShowCount (): number {
    return 5
  }
}

</script>
<style lang='scss' scoped>
@import '@/styles/theme.scss';

.languages-header {
  @extend %h4;
  font-weight: 600;
}
.languages-subheader {
  @extend %h6;
}
.languages-body {
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 240px));
}
.language {
  @extend %h6;
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  align-items: center;
  grid-column-gap: 5px;
}
.language-count {
  color: #666666;
  text-transform: uppercase;
}
.language-footer {
}
.language-button-toggle {
  height: $dim-400;
  padding: 0 $dim-50;
  border-radius: 5px;
}
</style>
