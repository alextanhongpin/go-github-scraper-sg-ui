<template>
  <span class='counter'>
    <slot></slot>
  </span>
</template>
<style lang='scss' scoped>
@import '@/styles/theme.scss';

.counter {
  display: inline-block;
  padding: 0 $dim-100;
  background: $color-alto;
  @extend %h6;
  border-radius: 5px;
  font-weight: 600;
  height: $dim-300;
  line-height: $dim-300;
  border-radius: #{$dim-300/2};
}
</style>
