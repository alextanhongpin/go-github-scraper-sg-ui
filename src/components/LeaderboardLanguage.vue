<template>
  <div class="leaderboard-language">
    <h3>
      Top Languages
    </h3>

    <p class="subheader">
      Based on the number of repositories
    </p>
    <bar-chart :chartData="chartData"></bar-chart>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Leaderboard } from '@/types'
import BarChart from '@/components/BarChart.vue'
import * as Color from '@/helpers/color'

@Component({
  components: {
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
    return {
      datasets: [
        {
          label: 'Top Programming Language',
          data: items.map(item => item.count),
          backgroundColor: items.map(item => Color.pick(item.name))
        }
      ],
      labels: items.map(item => item.name)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.leaderboard-language {
  padding: $dim-300;
  box-shadow: 0 5px 15px rgba(black, 0.2);
  border: 1px solid #ddd;
  margin: $dim-300;
  border-radius: 5px;
}
.subheader {
  @extend %subheader;
}
</style>
