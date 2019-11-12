<template>
  <div class="year-over-year-user">
    <h3>{{ header }}</h3>

    <h5>
      <b>{{ userCount.toLocaleString() }}</b>
      {{ subheader }}
    </h5>

    <break :px="33" />
    <bar-chart :chartData="chartData"></bar-chart>
    <break />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { Leaderboard } from '@/types'

// Components.
import Break from '@/components/Break.vue'
import BarChart from '@/components/BarChart.vue'

// Models.
import Namespace from '@/models/namespace'
import { chartData } from '@/models/chart'

@Component({
  components: {
    Break,
    BarChart
  }
})
export default class LeaderboardBarChartUser extends Vue {
  @Prop({ default: 'Year-over-Year User Growth' }) header!: string
  @Prop({ default: 'Users' }) subheader!: string

  @Action('fetchUserCountByYears', Namespace.user) fetchUserCountByYears: any

  @State('userCount', Namespace.user) userCount!: number
  @State('userCountByYears', Namespace.user) items!: Leaderboard[]

  mounted () {
    this.fetchUserCountByYears()
  }

  get max (): number {
    return Math.max(...this.items.map(i => i.count))
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
.year-over-year-user {
  padding: $dim-400;
  box-shadow: 0 5px 15px rgba(black, 0.2);
  border-radius: $dim-100;
}
</style>
