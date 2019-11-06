<template>
  <div class="leaderboard-repository">
    <Break />
    <LeaderboardBarChart
      :items="items"
      :max="max"
      colorStart="#78A9E6"
      colorEnd="#AC3FFF"
    >
      <h4 slot="header">{{ header }}</h4>
      <div slot="subheader">
        {{ subheader }}
        <Counter>{{ total && total.toLocaleString() }}</Counter>
      </div>
    </LeaderboardBarChart>
    <Break />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import Namespace from '@/models/namespace'

import Break from '@/components/Break.vue'
import LeaderboardBarChart from '@/components/leaderboard/LeaderboardBarChart.vue'
import Counter from '@/components/Counter.vue'
@Component({
  components: {
    Break,
    Counter,
    LeaderboardBarChart
  }
})
export default class LeaderboardBarChartRepository extends Vue {
  @Prop({ default: 'Repositories created by Year' }) private header: string
  @Prop({ default: 'Total repositories found in Malaysia and Singapore' })
  private subheader: string

  @State('leaderboardRepositoryByYears', Namespace.repo) items?: Leaderboard[]
  @Action('fetchRepositoriesByYears', Namespace.repo)
  fetchRepositoryCountByYears: any
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
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.leaderboard-repository {
  padding: 0 $dim-300;
  margin: $dim-300;
  box-shadow: 0 5px 15px rgba(black, 0.2);
  border-radius: $dim-300;
}
</style>
