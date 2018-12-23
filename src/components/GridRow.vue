<template>
  <div class='grid'>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GridRow extends Vue {
}
</script>
<style scoped lang='scss'>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
}
</style>
