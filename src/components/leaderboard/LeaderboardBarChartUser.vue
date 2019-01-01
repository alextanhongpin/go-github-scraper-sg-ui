<template>
  <div class='leaderboard-user'>
    <LeaderboardBarChart
      :items='items'
      :max='max'
    >
      <h4 slot='header'>{{header}}</h4>
      <div slot='subheader'>
        {{subheader}}
        <Counter>{{userCount.toLocaleString()}}</Counter>
      </div>
    </LeaderboardBarChart>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Namespace } from '@/models'

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
export default class LeaderboardBarChartUser extends Vue {
  @Prop({ default: 'Users created by Year' }) private header: string;
  @Prop({ default:  'Total users found in Malaysia and Singapore' }) private subheader: string;

  @State('userCount', Namespace.user) userCount?: number;
  @State('userCountByYears', Namespace.user) items?: Leaderboard[];
  @Action('fetchUserCountByYears', Namespace.user) fetchUserCountByYears: any;

  mounted () {
    this.fetchUserCountByYears()
  }
  get max (): number {
    return Math.max(...this.items.map(i => i.count))
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/theme.scss';
.leaderboard-user {
  padding: 0 $dim-300;
  margin: $dim-300;
  box-shadow: 0 5px 15px rgba(black, .2);
  border-radius: $dim-300;
}
</style>
