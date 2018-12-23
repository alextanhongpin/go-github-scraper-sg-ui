<template>
  <div class='container'>
    <div
      class='bar'
      :style='{width: width + "%", background: color}'
      >
      <div class='name'>
        {{name}}
      </div>
    </div>
    <div class='count'>
      {{count}}
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as Color from '@/helpers/color'

@Component
export default class LeaderboardLanguage extends Vue {
  @Prop() private name!: string;
  @Prop({default: 0}) private count!: number;
  @Prop({default: 0}) private maxCount!: number;
  get color (): string {
    return Color.pick(this.name)
  }
  get width (): number {
    return Math.ceil(this.count / this.maxCount * 100)
  }
}
</script>
<style scoped lang='scss'>
@import '@/styles/theme.scss';

.icon-language {
  height: $dim-100;
  width: $dim-100;
  border-radius: 50%;
  display: inline-block;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  height: $dim-500;
  line-height: $dim-500;
  padding: 0 $dim-100;
}

.bar {
  height: $dim-300;
  display: block;
  background: red;
  position: relative;
  border-radius: 3px;
}

.name {
  @extend h6;
  position: absolute;
  top: -$dim-200;
  font-weight: bold;
  white-space: nowrap;
}
</style>
