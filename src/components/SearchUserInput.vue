<template>
  <div class="search-user-input">
    <input
      class="search-input"
      type="search"
      placeholder="Enter your Github username"
      @input="$emit('keyup', $event.target.value)"
      autocomplete
      :value="keyword"
    />
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import Namespace from '@/models/namespace'

@Component
export default class SearchUserInput extends Vue {
  // Getters.
  @Getter('keyword', Namespace.match) keyword!: string
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
$search-dim: 48px;
$search-half-dim: #{$search-dim/2};
.search-user-input {
  // Let the container decide the width.
  // max-width: 320px;
  position: relative;
  text-align: center;
  width: 100%;
}

.search-input {
  @extend %h5;
  background: #eee;
  border-radius: $search-half-dim;
  border: 1px solid #ddd;
  height: $search-dim;
  padding: 0 $search-half-dim;
  width: 100%;
}
</style>
