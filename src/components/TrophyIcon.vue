<template>
  <i class="fa fa-trophy" :style="{ color: color }"></i>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

const TROPHIES: Record<string, string> = {
  gold: '#c98910',
  silver: '#a8a8a8',
  bronze: '#965a38'
}
@Component
export default class TrophyIcon extends Vue {
  @Prop() name!: string

  get color (): string {
    return TROPHIES[this.name] || ''
  }
}
</script>
