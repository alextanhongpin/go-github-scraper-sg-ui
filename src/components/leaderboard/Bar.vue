<template functional>
  <div
    class="bar"
    :style="{
      width: (props.count / props.max) * 100 + '%',
      background:
        'linear-gradient(45deg, ' +
        props.colorStart +
        ', ' +
        props.colorEnd +
        ' 80%)',
      borderLeft: '5px solid ' + props.colorStart
    }"
  >
    <slot />
  </div>
</template>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.bar {
  background: #eee;
  @extend %h6;
  height: $dim-400;
  line-height: $dim-400;
  font-weight: 600;
  white-space: nowrap;
}
</style>
