<template>
  <div class="recommendation-repositories">
    <Break />
    <div class="recommendation-repositories-header" v-if="user">
      <div class="repo-counter">
        <Counter>{{ user.repositories }}</Counter>
        Repositories
      </div>
      <div class="repo-counter">
        <Counter>{{ user.gists }}</Counter>
        Gists
      </div>
      <div class="repo-counter">
        <Counter>{{ user.pullRequests }}</Counter>
        Pull Requests
      </div>
      <div class="repo-counter">
        <Counter>{{ user.starredRepositories }}</Counter>
        Starred Repositories
      </div>
    </div>

    <Break />

    <div class="repositories">
      <a
        v-for="(repo, i) in repositories.slice(0, 6)"
        class="repository"
        :href="repo.url"
        target="_blank"
      >
        <div class="repo-header">
          <div class="repo-name">
            {{ repo.name }}
          </div>
          <Break px="5" />
          <div class="repo-created-at">
            Created {{ formatDate(repo.createdAt) }}
          </div>
          <Break />
          <div class="repo-description" v-if="repo.description">
            {{ repo.description }}
          </div>
          <Break />
          <div class="repo-topic" v-for="topic in repo.topics">{{ topic }}</div>
          <Break />
        </div>
        <div class="repo-stats">
          <LanguageCell
            :label="repo.primaryLanguage"
            class="repo-language"
          ></LanguageCell>
          <div class="repo-stargazers">★ {{ repo.stargazers }}</div>
        </div>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { User, Leaderboard, Repository } from '@/types'
import Namespace from '@/models/namespace'

// Components.
import Break from '@/components/Break.vue'
import Counter from '@/components/Counter.vue'
import LanguageCell from '@/components/LanguageCell.vue'

import { shortDate } from '@/helpers/date'

@Component({
  components: {
    Break,
    Counter,
    LanguageCell
  }
})
export default class RecommendationRepositories extends Vue {
  @State('user', Namespace.match) user?: User
  @State('repositories', Namespace.match) repositories?: Repository[]
  @State('languages', Namespace.match) languages?: Leaderboard[]
  formatDate (dateStr: string): string {
    return shortDate(dateStr)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.recommendation-repositories-header {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, max-content));
  grid-column-gap: $dim-300;
  font-weight: 600;
}

.repo-counter {
  align-content: center;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 5px;
}

.repositories {
  display: grid;
  grid-column-gap: $dim-100;
  grid-row-gap: $dim-100;
  grid-template-columns: 1fr 1fr;
}
.repository {
  border: 1px solid #dddddd;
  padding: $dim-300;
  text-decoration: none;
  color: inherit;
  background: white;
  min-height: 240px;
  border-radius: $dim-100;
  display: grid;
  justify-content: space-between;
  grid-template-rows: 1fr $dim-300;
  height: 100%;
  transition: 0.134s all ease-out;
}
.repository:hover {
  box-shadow: 0 5px 15px rgba(black, 0.2);
  transform: translate3d(0, -5px, 0);
}
.repo-name {
  font-weight: 600;
}
.repo-description {
}
.repo-stargazers {
}
.repo-language {
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  grid-column-gap: 5px;
  align-items: center;
}
.repo-created-at {
  @extend %h6;
  color: $color-silverlake;
}
.repo-stats {
  @extend %h6;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-column-gap: $dim-100;
  align-items: center;
  height: $dim-300;
}

$dim-topic: #{$dim-300/2};
.repo-topic {
  @extend %h6;
  background: #eee;
  display: inline-block;
  margin: 0 5px 0 0;
  padding: 0 $dim-topic;
  border-radius: $dim-topic;
  height: $dim-300;
}
</style>
