<template>
  <div class='leaderboard'>
    <h4 class='leaderboard-header'>
      <slot name='header'>Header</slot>
    </h4>
    <div class='leaderboard-subheader'>
      <slot name='subheader'>Subheader</slot>
    </div>

    <Break/>

    <BarChart
      :items='items'
      :max='max'
    >
      <Bar
        slot='bar'
        slot-scope='item'
        v-bind='item'
        :colorStart='colorStart'
        :colorEnd='colorEnd'
      >{{item.count}}</Bar>
    </BarChart>
    <Break/>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

import { Leaderboard } from '@/models'
import Break from '@/components/Break.vue'
import Bar from '@/components/leaderboard/Bar.vue'
import BarChart from '@/components/leaderboard/BarChart.vue'

@Component({
  components: {
    Break,
    Bar,
    BarChart
  }
})
export default class Leaderboard extends Vue {
  @Prop() items: Leaderboard[];
  @Prop({ default: 0 }) max: number;
  @Prop({ default: '#F7B48C' }) colorStart: string;
  @Prop({ default: '#3FE4FF' }) colorEnd: string;
}
</script>
<style lang='scss' scoped>
@import '@/styles/theme.scss';
.leaderboard-header {
  font-weight: 600;
}
.leaderboard-subheader {
  @extend %subheader;
}
</style>
