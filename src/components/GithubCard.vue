<template>
  <a class='card' :href='githubLink' target='_blank' v-if='user'>
    <div class='front'>
      <img class='image' :src='user.avatarUrl'/>
      <div class='user-info'>
        <Break/>
        <div class='login'>
          {{user.login}}
        </div>
        <Break px='5'/>
        <div class='created-at'>
          Member since {{createdAtFmt}}
        </div>
        <Break/>
      </div>
    </div>
    <div class='back'>
      <div class='user-detail'>
        <div class='user-row'>
          <img class='thumbnail' :src='user.avatarUrl'/>
          <div>
            <div class='user-row__name' :title='user.name'>{{user.name}}</div>
            <div class='user-row__created_at'>Member since {{createdAtFmt}}</div>
          </div>
        </div>
        <div class='bio'>
          {{user.bio}}
          <div class='company' v-if='user.company'>
            @{{user.company}}
          </div>
        </div>
        <div class='count-info'>
          <div>
            <div class='counter'>
              {{user.followers}}
            </div> Followers
          </div>
          <div>
            <div class='counter'>
              {{user.following}}
            </div> Following
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { User } from '@/models'
import Break from '@/components/Break.vue'
import * as DateHelper from '@/helpers/date'

@Component({
  components: {
    Break
  }
})
export default class GithubCard extends Vue {
  @Prop() private user?: User;
  get createdAtFmt (): string {
    if (!this.user) {
      return ''
    }
    return DateHelper.shortDate(this.user.createdAt)
  }
  get githubLink (): string {
    return this.user
      ? `https://github.com/${this.user.login}`
      : ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.30);
}

.front,
.back {
  backface-visibility: hidden;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.20);
  height: 100%;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: .134s all ease-out;
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
  font-weight: 600;
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
  grid-template-rows: $dim-500 1fr $dim-300;
  height: 100%;
  -ms-flex-pack: distribute;
  grid-row-gap: $dim-100;
}

.thumbnail {
  height: $dim-500;
  width: $dim-500;
  border-radius: 50%;
}

.user-row {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-column-gap: 10px;
}

.user-row__name {
  font-weight: bold;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 160px;
}
.user-row__created_at {
  @extend %h6;
}

.bio {
  @extend %h6;
}

.count-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @extend %h6;
}

.counter {
  display: inline-block;
  padding: 0 $dim-50;
  background: $color-alto;
  font-size: $dim-50;
  border-radius: 5px;
}
</style>
