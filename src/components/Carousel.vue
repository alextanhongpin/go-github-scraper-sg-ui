<template>
  <div class='carousel-container'>
    <div class='is-end' v-if='isEnd'></div>
    <div class='carousel' v-on:wheel='scroll' ref='carousel'>
      <slot name='carousel'></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { Emit, Component, Vue } from 'vue-property-decorator'

@Component
export default class Carousel extends Vue {
  $refs!: {
    carousel: HTMLElement
  }
  isEnd = false
  @Emit('scroll-horizontal')
  scroll (evt: Event) {
    const { carousel } = this.$refs
    const maxScrollWidth = carousel.scrollWidth - carousel.offsetWidth
    // if (carousel.scrollLeft === 0) {
      // console.log('start')
    // }
    this.isEnd = carousel &&  carousel.scrollLeft === maxScrollWidth
    return this.isEnd
  }
}
</script>
<style scoped lang='scss'>
.carousel-container {
  position: relative;
}
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

.is-end {
  position: absolute;
  right: 0;
  background: rgba(black, 0.20);
  height: 100%;
  width: 30px;
  z-index: 1000;
  border-radius: 100% 0 0 100%;
  animation: slideIn 0.34s ease-out forwards;
  -webkit-animation: slideIn 0.34s ease-out forwards;
  transition: .174s all ease-out;
}

@-webkit-keyframes slideIn {
  from {
    opacity: 0.5;
    width: 50px;
  }
  to {
    opacity: 1;
    width: 30px;
  }
}
@keyframes slideIn {
  from {
    opacity: 0.5;
    width: 50px;
  }
  to {
    opacity: 1;
    width: 30px;
  }
}
</style>
