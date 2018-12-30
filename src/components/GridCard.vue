<template>
  <div class="grid-card">
    <slot name="card"></slot>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GridCard extends Vue {
}
</script>
<style lang='scss' scoped>
.grid-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}
</style>
