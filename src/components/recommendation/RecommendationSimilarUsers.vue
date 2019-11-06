<template>
  <div class="component" v-if="users.length">
    <div class="header">{{ header }}</div>
    <Break />
    <div class="list">
      <!-- <slot class='list' v-for='user in users' v-bind='user'></slot> -->

      <Carousel>
        <GithubCard
          slot="carousel"
          :user="user"
          v-for="user in users"
          :key="user.login"
        />
      </Carousel>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

// Components.
import Break from '@/components/Break.vue'
import Carousel from '@/components/Carousel.vue'
import GithubCard from '@/components/GithubCard.vue'

import { User } from '@/types'
import Namespace from '@/models/namespace'

import { State } from 'vuex-class'

@Component({
  components: {
    Break,
    Carousel,
    GithubCard
  }
})
export default class RecommendationSimilarUsers extends Vue {
  // Getters.
  @State('recommendations', Namespace.match) users?: User[]
  @Prop() header!: string
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.header {
  font-weight: 600;
  @extend %h4;
}
.list-x {
  display: grid;
  // grid-template-columns: minmax(160px, max-content) repeat(auto-fill, 200px);
  grid-template-columns: repeat(auto-fill, 200px);
  grid-auto-flow: row;
  grid-row-gap: $dim-100;
  grid-column-gap: $dim-100;
}
</style>
