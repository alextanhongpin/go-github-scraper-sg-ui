<template>
  <span class='counter'>
    <slot></slot>
  </span>
</template>
<style lang='scss' scoped>
@import '@/styles/theme.scss';

.counter {
  display: inline-block;
  padding: 0 $dim-50;
  background: $color-alto;
  font-size: $dim-50;
  border-radius: 5px;
}
</style>
