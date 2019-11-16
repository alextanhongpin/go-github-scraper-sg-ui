<template>
  <div class="language-cell" :title="label">
    <div class="icon" :style="{ background: color }"></div>
    <span class="label">&nbsp; {{ label }} <slot></slot> </span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as Color from '@/models/color'

@Component
export default class LanguageCell extends Vue {
  @Prop({ default: '' }) private label!: string
  get color (): string {
    return Color.pick(this.label)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.icon {
  height: $dim-200;
  width: $dim-200;
  border-radius: 50%;
  position: relative;
  display: inline-block;
}
</style>
