<template>
  <div class="leaderboard-language">
    <h3>
      Top Languages
    </h3>

    <h5>
      Based on the number of repositories
    </h5>
    <break :px="33" />
    <bar-chart :chartData="chartData"></bar-chart>
    <break />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Leaderboard } from '@/types'

import BarChart from '@/components/BarChart.vue'
import Break from '@/components/Break.vue'

import { chartData } from '@/models/chart'
import * as Color from '@/helpers/color'

@Component({
  components: {
    Break,
    BarChart
  }
})
export default class LeaderboardLanguage extends Vue {
  @Prop() private name!: string
  @Prop({ default: [] }) private items!: Leaderboard[]
  @Prop({ default: 0 }) private totalCount!: number

  percentage (count: number): number {
    return Math.ceil((count / this.totalCount) * 100)
  }

  formatCount (count: number): string {
    return count.toLocaleString()
  }

  color (label: string): string {
    return Color.pick(label)
  }

  opacity (index: number, count: number): number {
    const value = this.percentage(count)
    return (value - index + 1) / value
  }

  get chartData () {
    const items = this.items
    const x = this.items.map(i => i.name)
    const y = this.items.map(i => i.count)
    return chartData(x, y, name => Color.pick(name))
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.leaderboard-language {
  padding: $dim-400;
  box-shadow: 0 5px 15px rgba(black, 0.2);
  border-radius: $dim-100;
}
</style>
