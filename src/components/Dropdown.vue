<template functional>
  <div class='dropdown'>
    <div
      class='item'
      v-for='item in props.items'
      :key='item'
    >
      <slot :item='item'>{{item}}</slot>
    </div>
  </div>
</template>
<style lang='scss' scoped>
@import '@/styles/theme.scss';

.dropdown {
  width: 100%;
  box-shadow: 0 5px 15px rgba(black, 0.2);
  padding: 0 $dim-100;
  border-radius: $dim-100;
  text-align: left;

  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  overflow: scroll;
  background: white;
  z-index: 1000;
  // Display only 10 items.
  max-height: #{$dim-500 * 10};
}

.item {
  border-bottom: 1px solid #EEEEEE;
  height: $dim-600;
  line-height: $dim-600;
  padding: 0 $dim-100;
  width: 100%;
}
</style>
