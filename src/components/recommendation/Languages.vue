<template>
  <div>
    <h3>{{ header }}</h3>

    <p>
      <b>{{ languages.length }}</b>
      {{ languageLabel }}
    </p>
    <break />
    <pie-chart :chartData="chartdata"></pie-chart>
  </div>
</template>
<script lang="ts">
import { Action, Getter, State } from 'vuex-class'
import { Component, Prop, Vue } from 'vue-property-decorator'

// Components.
import Break from '@/components/Break.vue'
import PieChart from './PieChart.vue'

import { Leaderboard } from '@/types'
import { chartData } from '@/models/chart'
import Namespace from '@/models/namespace'
import * as Color from '@/helpers/color'

@Component({
  components: {
    Break,
    PieChart
  }
})
export default class RecommendationLanguages extends Vue {
  displayLanguageCount: number = 5
  displayLanguageLabel: string = 'Show All'
  @Prop() header!: string

  // States.
  @Getter('languages', Namespace.match) languages?: Leaderboard[]

  // Methods.
  formatPercentage (count: number): string {
    return ((count / this.totalRepositoryCount) * 100).toFixed(1)
  }

  toggleLanguage () {
    const totalCount = this.languages.length
    const isPartial = this.displayLanguageCount === this.maxShowCount
    this.displayLanguageCount = isPartial ? totalCount : this.maxShowCount
    this.displayLanguageLabel = isPartial ? 'Show Less' : 'Show All'
  }

  repoLabel (count: number): string {
    return count === 1 ? 'repo' : 'repos'
  }

  get maxShowCount (): number {
    return 5
  }

  get filteredLanguages (): Leaderboard[] {
    return this.languages.slice(0, this.displayLanguageCount)
  }

  get hasMoreThanMax (): boolean {
    return this.languages.length > this.maxShowCount
  }

  get totalRepositoryCount (): number {
    return this.languages.reduce((acc: number, { count }) => {
      return acc + count
    }, 0)
  }

  get languageLabel () {
    return this.languages.length === 1 ? 'Language' : 'Languages'
  }

  get chartdata () {
    const y = this.languages.map(lang => lang.count)
    const x = this.languages.map(lang => lang.name)
    return chartData(x, y, name => Color.pick(name))
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.subheader {
  @extend %h6;
}
.body {
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
.count {
  color: #666666;
  text-transform: uppercase;
}
.footer {
}
.button-toggle {
  height: $dim-400;
  padding: 0 $dim-50;
  border-radius: 5px;
}
</style>
