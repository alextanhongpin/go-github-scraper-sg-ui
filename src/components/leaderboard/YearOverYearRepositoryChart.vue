<template>
  <div class="leaderboard-repository">
    <h3>{{ header }}</h3>

    <h5>
      <b>{{ total && total.toLocaleString() }}</b>
      {{ subheader }}
    </h5>

    <break :px="33" />
    <bar-chart :chartData="chartData"></bar-chart>
    <break />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'

// Components.
import Break from '@/components/Break.vue'
import BarChart from '@/components/BarChart.vue'

import { Leaderboard } from '@/types'

// Models.
import Namespace from '@/models/namespace'
import { chartData } from '@/models/chart'
@Component({
  components: {
    Break,
    BarChart
  }
})
export default class LeaderboardBarChartRepository extends Vue {
  @Prop({ default: 'Year-over-Year Repository Growth' }) header!: string
  @Prop({ default: 'Repositories' }) subheader!: string

  @Action('fetchRepositoriesByYears', Namespace.repo)
  fetchRepositoryCountByYears: any

  @State('leaderboardRepositoryByYears', Namespace.repo)
  items!: Leaderboard[]

  mounted () {
    this.fetchRepositoryCountByYears()
  }

  get max (): number {
    return Math.max(...this.items.map(i => i.count))
  }

  get total (): number {
    return this.items.reduce((acc, i) => {
      return acc + i.count
    }, 0)
  }

  get chartData () {
    const x = this.items.map(i => i.name)
    const y = this.items.map(i => i.count)
    return chartData(x, y)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.leaderboard-repository {
  padding: $dim-400;
  box-shadow: 0 5px 15px rgba(black, 0.2);
  border-radius: $dim-100;
}
</style>
