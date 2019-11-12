<template>
  <div v-if="users.length">
    <h3>Your Similar Users</h3>
    <Carousel>
      <GithubCard
        slot="carousel"
        :user="user"
        v-for="user in users"
        :key="user.login"
      />
    </Carousel>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

// Components.
import Carousel from '@/components/Carousel.vue'
import GithubCard from '@/components/GithubCard.vue'

import { User } from '@/types'
import Namespace from '@/models/namespace'

@Component({
  components: {
    Carousel,
    GithubCard
  }
})
export default class RecommendationSimilarUsers extends Vue {
  // Getters.
  @Prop() header!: string
  @State('recommendations', Namespace.match) users?: User[]
  @State('nextCursor', Namespace.user) nextCursor?: string
  @Action('fetchUsers', Namespace.user) fetchUsers: any

  throttle = -1
  mounted () {
    this.fetchUsers()
  }
  // TODO: Deprecate this.
  async scroll (scrollEnd: boolean) {
    if (scrollEnd) {
      this.throttle && window.clearTimeout(this.throttle)
      this.throttle = window.setTimeout(() => {
        this.fetchUsers(this.nextCursor)
      }, 250)
    }
  }
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
