<template>
  <div class='break' :style='{height: px + "px"}'></div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Break extends Vue {
  @Prop() private px?: number;
}
</script>
<style scoped lang='scss'>
.break {
  display: block;
  // For debugging.
  // background: red;
  height: 10px;
}
</style>
