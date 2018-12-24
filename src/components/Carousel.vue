<template>
  <div class='carousel-container'>
    <div class='carousel' v-on:wheel='scroll' ref='carousel'>
      <slot name='carousel'></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { Emit, Component, Vue } from 'vue-property-decorator'

@Component
export default class Carousel extends Vue {
  @Emit('scroll-horizontal')
  scroll (evt) {
    const { carousel } = this.$refs
    if (!carousel) {
      return false
    }
    const maxScrollWidth = carousel.scrollWidth - carousel.offsetWidth
    if (carousel.scrollLeft === 0) {
      // console.log('start')
    }
    if (carousel.scrollLeft === maxScrollWidth) {
      // console.log('end')
      return true
    }
    return false
  }
}
</script>
<style scoped lang='scss'>
.carousel {
  display: grid;
  max-width: 100vw;
  grid-auto-flow: column;
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
