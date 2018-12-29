<template>
  <div class='user-profile'>
    <div class='user-grid-aside'>
      <img class='user-photo' :src='user.avatarUrl'/>
    </div>

    <div class='user-grid-main'>
      <a
        class='user-login'
        :href='githubLink(user.login)'
        target='_blank'
        >{{user.login}}</a>
      <div class='user-name'>({{user.name}})</div>
      <div class='user-created-at'>Member since {{formatDate(user.createdAt)}}</div>
      <Break/>

      <div class='user-bio'>{{user.bio}}</div>
      <Break/>

      <div class='counters'>
        <div>
          <Counter>{{user.followers}}</Counter>
          followers
        </div>

        <div>
          <Counter>{{user.following}}</Counter>
          following
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  User
} from '@/models'
import Break from '@/components/Break.vue'
import Counter from '@/components/Counter.vue'
import { shortDate } from '@/helpers/date'

@Component({
  components: {
    Break,
    Counter
  }
})
export default class UserProfile extends Vue {
  @Prop() user?: User;

  githubLink (user: string): string {
    return [this.githubUri, user].join('/')
  }

  formatDate (dateStr: string): string {
    return shortDate(dateStr)
  }
}
</script>
<style scoped lang='scss'>
@import '@/styles/theme.scss';
.user-profile {
  .user-photo {
    max-width: 320px;
    width: 100%;
    height: auto;
    border-radius: 11px;
  }

  .user-login {
    @extend %h4;
    display: block;
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }
  .user-name {
    @extend %h5;
  }
  .user-created-at {
    @extend %h5;
    color: $color-silverlake;
  }
  .user-bio {
    @extend %h5;
  }
  .counters {
    @extend %h6;
    display: grid;
    grid-auto-flow: column;
    justify-content: flex-start;
    grid-column-gap: $dim-100;
  }
}
</style>
