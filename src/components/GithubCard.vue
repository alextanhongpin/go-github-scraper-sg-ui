<template>
  <a class="card" :href="githubLink" target="_blank" v-if="user">
    <div class="front">
      <img class="image" :src="user.avatarUrl" />
      <div class="user-info">
        <h4 class="login">
          {{ user.login }}
        </h4>
        <break />

        <div class="count-info">
          <div>
            <b>
              {{ user.followers }}
            </b>
            Followers
          </div>
          <div>
            <b>
              {{ user.following }}
            </b>
            Following
          </div>
        </div>
        <break />
      </div>
    </div>
    <div class="back">
      <div class="user-detail">
        <div class="user-row">
          <img class="thumbnail" :src="user.avatarUrl" />
          <div>
            <p class="user-row__name" :title="user.name">{{ user.name }}</p>
            <h6 class="user-row__created_at">
              Member since {{ createdAtFmt }}
            </h6>
          </div>
        </div>

        <div class="bio">
          {{ user.bio }}
          <div class="company" v-if="user.company">@{{ user.company }}</div>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { User } from '@/types'
import Break from '@/components/Break.vue'
import * as DateHelper from '@/helpers/date'

@Component({
  components: {
    Break
  }
})
export default class GithubCard extends Vue {
  @Prop() private user?: User
  get createdAtFmt (): string {
    if (!this.user) {
      return ''
    }
    return DateHelper.shortDate(this.user.createdAt)
  }
  get githubLink (): string {
    return this.user ? `https://github.com/${this.user.login}` : ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.card {
  backface-visibility: hidden;
  color: inherit;
  display: inline-block;
  perspective: 1500px;
  position: relative;
  text-decoration: none;
  transform-origin: center center;
  transform-style: preserve-3d;
  word-break: break-word;
}

.card:hover .back {
  transform: rotateY(0deg);
}

.card:hover .front {
  transform: rotateY(-180deg);
}
.card:hover .front,
.card:hover .back {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

.front,
.back {
  backface-visibility: hidden;
  border-radius: 7px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  height: 100%;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: 0.134s all ease-out;
  width: 100%;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: rotateY(180deg);
}

$image-dimension: 240px;

.image {
  background: $color-gray;
  width: $image-dimension;
  height: $image-dimension;
}

.user-info {
  padding: 0 16px;
}

.login {
  font-weight: bold;
}

.name {
  color: #888;
}

.created-at {
  @extend %h6;
}

.company {
  @extend %h6;
  color: $color-silver;
}

.user-detail {
  padding: $dim-200;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: max-content 1fr;
  height: 100%;
  -ms-flex-pack: distribute;
  grid-row-gap: $dim-200;
}

.thumbnail {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.user-row {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-column-gap: 10px;
  align-items: center;
}

.user-row__name {
  font-weight: bold;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 160px;
}

.bio {
  @extend %h5;
}

.count-info {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-column-gap: 11px;
}

.counter {
  display: inline-block;
  padding: 0 $dim-50;
  background: $color-alto;
  font-size: $dim-50;
  border-radius: 5px;
}
</style>
