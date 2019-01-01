<template functional>
  <div class='bar-chart'>
    <div
      v-for='item in props.items'
      class='bars'
    >
      <slot name='label' :item='item'>{{item.name}}</slot>
      <slot
        name='bar'
        :max='props.max'
        :count='item.count'
        >
        <div class='bar'
          :style='{width: (item.count/props.max * 100) + "%"}'
          >{{item.count}}</div>
      </slot>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import '@/styles/theme.scss';
.bar-chart {
  display: grid;
  grid-row-gap: 3px;
}
.bars {
  @extend %h6;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: $dim-100;
  align-items: center;
}
.bar {
  background: black;
}
</style>
