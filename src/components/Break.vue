<template>
  <div class="break" :style="{ height: px + 'px' }"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Break extends Vue {
  @Prop() private px?: number
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
// The scoped must be at the end.
.break {
  display: block;
  // For debugging.
  // background: red;
  height: 11px;
}
</style>
