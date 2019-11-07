<template>
  <div class="component">
    <input
      class="search"
      type="search"
      placeholder="Enter your Github username"
      @input="$emit('keyup', $event.target.value)"
      autocomplete
    />
    <slot></slot>
  </div>
</template>
<script>
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class SearchUserInput extends Vue {}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
$search-dim: $dim-600;
$search-half-dim: #{$search-dim/2};
.component {
  // Let the container decide the width.
  // max-width: 320px;
  position: relative;
  text-align: center;
  width: 100%;
}

.search {
  @extend %h5;
  background: $color-gray;
  border-radius: $search-half-dim;
  border: 1px solid $color-alto;
  height: $search-dim;
  padding: 0 $search-half-dim;
  width: 100%;
}
</style>
