<template>
  <div class='language-cell'>
    <div class='icon' :style='{background: color}'></div>
    <span class='label'>
      {{label}} <slot></slot>
    </span>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as Color from '@/helpers/color'

@Component
export default class LanguageCell extends Vue {
  @Prop({ default: '' }) private label!: string;
  get color (): string {
    return Color.pick(this.label)
  }
}
</script>
<style scoped lang='scss'>
@import '@/styles/theme.scss';

.icon {
  height: $dim-100;
  width: $dim-100;
  border-radius: 50%;
  position: relative;
  display: inline-block;
}

</style>
