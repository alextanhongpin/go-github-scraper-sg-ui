<template>
  <div class='component' v-if='users.length'>
    <div class='header'>{{header}}</div>
    <Break/>
    <div class='list'>
    <slot class='list' v-for='user in users' v-bind='user'></slot>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

// Components.
import Break from '@/components/Break.vue'

import {
  User,
  Namespace
} from '@/models'

import {
  Getter
} from 'vuex-class'

@Component({
  components: {
    Break
  }
})
export default class RecommendationSimilarUsers extends Vue {
  // Getters.
  @Getter('recommendations', Namespace.user) users?: User[];
  @Prop() header!: string;
}

</script>
<style lang='scss' scoped>
@import '@/styles/theme.scss';

.header {
  font-weight: bold;
}
.list {
  display: grid;
  // grid-template-columns: minmax(160px, max-content) repeat(auto-fill, 200px);
  grid-template-columns: repeat(auto-fill, 200px);
  grid-auto-flow: row;
  grid-row-gap: $dim-100;
  grid-column-gap: $dim-100;
}
</style>
