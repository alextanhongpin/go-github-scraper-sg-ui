<template>
  <div class="repositories-container">
    <div class="recommendation-repositories-header" v-if="user">
      <div class="repo-counter">
        <b>{{ user.repositories }}</b>
        Repositories
      </div>
      <div class="repo-counter">
        <b>{{ user.gists }}</b>
        Gists
      </div>
      <div class="repo-counter">
        <b>{{ user.pullRequests }}</b>
        Pull Requests
      </div>
      <div class="repo-counter">
        <b>{{ user.starredRepositories }}</b>
        Starred Repositories
      </div>
    </div>

    <div class="repositories">
      <a
        v-for="repo in repositories"
        :href="repo.url"
        :key="repo.name"
        class="repository-link"
        target="_blank"
      >
        <repository v-bind="repo" />
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { User, Leaderboard, Repository as IRepository } from '@/types'
import Namespace from '@/models/namespace'

// Components.
import Break from '@/components/Break.vue'
import Repository from '@/components/Repository.vue'

@Component({
  components: {
    Break,
    Repository
  }
})
export default class RecommendationRepositories extends Vue {
  @State('user', Namespace.match) user?: User
  @State(state => state.repositories.slice(0, 6), Namespace.match)
  repositories?: IRepository[]
  @State('languages', Namespace.match) languages?: Leaderboard[]
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.recommendation-repositories-header {
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-column-gap: $dim-300;
  height: 48px;
  line-height: 48px;
}

.repositories {
  display: grid;
  grid-column-gap: $dim-100;
  grid-row-gap: $dim-100;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 800px) {
  .repositories {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .repositories {
    grid-template-columns: 1fr;
  }
}
.repository-link {
  display: block;
  text-decoration: none;
  color: inherit;
}
</style>
