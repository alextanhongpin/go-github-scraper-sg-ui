<template>
  <div class='carousel-container'>
    <div class='carousel'>
      <slot name='carousel'></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Carousel extends Vue {}
</script>
<style scoped lang='scss'>
.carousel {
  display: grid;
  max-width: 100vw;
  grid-template-columns: repeat(20, 240px);
  grid-column-gap: 20px;
  overflow: scroll;
  perspective: 1500px;
  padding: 20px 20px 40px;
  // Smooth-scrolling on iOS.
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
