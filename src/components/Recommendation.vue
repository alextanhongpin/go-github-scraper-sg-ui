<template>
  <div>
    <div class='search-wrapper'>
      <input
      class='search'
      type='search'
      placeholder='Enter your Github username'
      @keyup='search'
      />
      <div class='suggestions'>
        <div
          v-for='user in usersWithRecommendations(keyword)'
          class='suggestion'
        >{{user}}</div>
      </div>
    </div>
    <Break/>

    <div class='recommend-section'>
      <GithubCard :user="searchUser"/>

      <div>
        <div class='recommend-header'><b>Similar Users</b></div>
        <Break/>
        <div class='recommendations'>
          <a
            class='recommend'
            target='_blank'
            v-for='recommendation in recommendations'
            :href='githubLink(recommendation.login)'
            >
            <img class='recommend-photo' :src='recommendation.avatarUrl'/>
            <div class='recommend-info'>
              <b class='recommend-login'> {{ recommendation.login }} </b>
              <div class='recommend-name'>{{ recommendation.name }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import Break from '@/components/Break.vue'
import GithubCard from '@/components/GithubCard.vue'

import { throttle } from '@/helpers/throttle'
import {
  User,
  Namespace
} from '@/models'

import {
  Action,
  Getter,
  State
} from 'vuex-class'
@Component({
  components: {
    Break,
    GithubCard
  }
})
export default class Recommendation extends Vue {
  keyword: string = '';

  // Actions.
  @Action('fetchRecommendations', Namespace.user) fetchRecommendations: any;
  @Action('fetchUsersWithRecommendations', Namespace.user) fetchUsersWithRecommendations: any

  // Getters.
  @Getter('recommendations', Namespace.user) recommendations?: User[];
  @Getter('usersWithRecommendations', Namespace.user) usersWithRecommendations?: string[];

  // States.
  @State('githubUri') githubUri?: string;
  @State('searchUser', Namespace.user) searchUser?: User;

  // Lifecycles.
  mounted () {
    this.fetchUsersWithRecommendations()
  }

  // Methods.
  search (evt: EventTarget) {
    this.keyword = evt.target.value
    if (this.keyword.trim().length) {
      this.throttleFetch(this.keyword)
    }
  }

  @throttle(250)
  throttleFetch(keyword) {
      this.fetchRecommendations(keyword)
  }

  githubLink (user: string): string {
    return [this.githubUri, user].join('/')
  }
}

</script>
<style scoped lang='scss'>
@import '@/styles/theme.scss';

.search-wrapper {
  padding: 0 $dim-300;
}
$search-dim: $dim-600;
$search-half-dim: #{$search-dim/2};
.search {
  height: $search-dim;
  border: none;
  background: $color-gray;
  border-radius: $search-half-dim;
  padding: 0 $search-half-dim;
  @extend %h5;
  width: 100%;
  max-width: 360px;
}

.recommend-section {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-column-gap: $dim-100;
  align-items: flex-start;
  margin: 21px;
}
.recommend {
  display: grid;
  grid-template-columns: $dim-500 1fr;
  grid-column-gap: $dim-50;
  padding: $dim-50;
  border-radius: $dim-50;
  text-decoration: none;
  color: inherit;
}
.recommend:hover {
  background: #EEEEEE;
}

.recommend-photo {
  height: $dim-500;
  width: auto;
  background: $color-silverlake;
  border-radius: 50%;
  vertical-align: middle;
}
// For ellipsis to work in the grid-layout, apply it to the parent container;
.recommend-info {
  overflow: hidden;
}
.recommend-name {
  @extend %h6;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.recommend-header {
  margin: 0 $dim-100;
  font-weight: 600;
  @extend %h4;
}

.recommendations {
  display: grid;
  grid-template-columns: minmax(160px, max-content) repeat(auto-fill, 200px);
  grid-auto-flow: row;
  grid-row-gap: $dim-50;
}
.suggestions {
  display: grid;
  grid-auto-flows: column;

  width: 100%;
  max-width: 320px;
  box-shadow: 0 5px 15px rgba(black, 0.2);
  padding: 0 $dim-100;
  border-radius: $dim-100;

  grid-row-gap: 5px;
  max-height: #{$dim-500 * 10};
  overflow: scroll;
}

.suggestion {
  height: $dim-500;
  line-height: $dim-500;
  border-bottom: 1px solid #EEEEEE;
}

</style>
