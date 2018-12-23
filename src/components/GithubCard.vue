<template>
  <a class='card' :href='githubLink' target='_blank'>
    <div class='front'>
      <img class='image' :src='user.avatarUrl'/>
      <div class='user-info'>
        <Break/>
        <div class='name'>
          <b class='login'>{{user.login}}</b>
        </div>
        <Break/>
        <div v-if='user.name'>{{user.name}}</div>
        <Break px='5'/>
        <div class='company' v-if='user.company'>
          @{{user.company}}
        </div>
        <Break/>
        <div class='count-info'>
          <i class='icon icon-follower'></i> {{user.followers}}
          <i class='icon icon-repository'></i> {{user.repositories}}
        </div>
        <Break/>
      </div>
    </div>
    <div class='back'>
      <div class='user-detail'>
        <Break/>
        <div class='user-row'>
          <img class='thumbnail' :src='user.avatarUrl'/>
          <div>
            <div class='user-row__name'>{{user.name}}</div>
            <div class='user-row__created_at'>Member since {{createdAtFmt}}</div>
          </div>
        </div>
        <Break/>
        <p v-if='user.bio'>
          {{user.bio}}
        </p>
        <Break/>
        <p v-if='user.location'>
          Location: {{user.location}}
        </p>
        <Break/>
        <div v-if='user.websiteUrl'>
          Website: {{user.websiteUrl}}
        </div>
        <Break/>
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
    return `https://github.com/${this.user.login}`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles/theme.scss';

.card {
  display: inline-block;
  position: relative;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  perspective: 1500px;
  transform-origin: center center;
  text-decoration: none;
  color: inherit;
}

.card:hover .back {
  transform: rotateY(0deg);
}
.card:hover .front {
  transform: rotateY(-180deg);
}
.card:hover .front,
.card:hover .back {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.front,
.back {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: .134s all ease-out;
  overflow: hidden;
  border-radius: 5px;
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
  padding: 0 10px;
}

.name {
  @extend %h4;
}

.company {
  @extend %h6;
  color: $color-silver;
}

.icon {
  width: 20px;
  height: 20px;
  background: $color-gray;
  display: inline-block;
}

.user-detail {
  padding: 0 10px;
  word-break: break-word;
}
.thumbnail {
  height: 40px;
  width: 40px;
}
.user-row {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-column-gap: 10px;
}
.user-row__name {
  font-weight: bold;
}
.user-row__created_at {
  @extend %h6;
  color: $color-silver;
}

</style>
