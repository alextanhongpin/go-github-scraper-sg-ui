<template>
  <div class="dropdown">
    <div class="item" v-for="item in items" :key="item">
      <slot :item="item">
        <!--
        <div :item="item" @click="$emit('click', $event)" :name="item">
          {{ item }}
        </div>
      -->
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Dropdown extends Vue {
  @Prop() items: string[]
}
</script>
<style lang="scss" scoped>
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
  border-bottom: 1px solid #eeeeee;
  height: 48px;
  line-height: 48px;
  padding: 0 $dim-100;
  width: 100%;
  cursor: pointer;
}
.item:hover {
  background: #eee;
}
</style>
