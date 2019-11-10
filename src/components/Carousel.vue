<template>
  <div class="carousel-container">
    <div class="is-end" v-if="isEnd"></div>
    <div class="carousel" v-on:wheel="scroll" ref="carousel">
      <slot name="carousel"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Emit, Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Carousel extends Vue {
  $refs!: {
    carousel: HTMLElement
  }
  // A boolean to indicate that the user has reached the end of the horizontal
  // scroll.
  isEnd = false

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange (route: any) {
    // Reset the horizontal scroll whenever the user goes to a new page.
    if (this.$refs && this.$refs.carousel) {
      this.$refs.carousel.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  @Emit('scroll-horizontal')
  scroll (evt: Event) {
    const { carousel } = this.$refs
    const maxScrollWidth = carousel.scrollWidth - carousel.offsetWidth
    this.isEnd = carousel && carousel.scrollLeft === maxScrollWidth
    return this.isEnd
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.carousel-container {
  position: relative;
}

.carousel-container:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: $dim-100;
  background: linear-gradient(90deg, white, rgba(255, 255, 255, 0.2));
  z-index: 1000;
}
.carousel-container:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: $dim-100;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), white);
  z-index: 1000;
}

.carousel {
  display: grid;
  max-width: 100vw;
  grid-auto-flow: column;
  grid-column-gap: 20px;
  overflow: scroll;
  perspective: 1500px;
  padding: 20px 10px 40px;
  // Smooth-scrolling on iOS.
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}

.is-end {
  position: absolute;
  right: 0;
  background: rgba(black, 0.2);
  height: 100%;
  width: 30px;
  z-index: 1000;
  border-radius: 100% 0 0 100%;
  animation: slideIn 0.34s ease-out forwards;
  -webkit-animation: slideIn 0.34s ease-out forwards;
  transition: 0.174s all ease-out;
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
