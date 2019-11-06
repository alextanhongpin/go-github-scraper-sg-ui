<template>
  <div class='user-profile'>
    <div class='user-grid-aside'>
      <img class='user-photo' :src='avatarUrl'/>
    </div>

    <div class='user-grid-main'>
      <a
        class='user-login'
        :href='githubLink(login)'
        target='_blank'
        >{{login}}</a>
      <div class='user-name' v-if='name'>({{name}})</div>
      <div class='user-created-at'>Member since {{formatDate(createdAt)}}</div>
      <Break/>

      <div class='user-bio' v-if='bio'>{{bio}}</div>
      <Break/>

      <div class='counters'>
        <div>
          <Counter>{{followers}}</Counter>
          followers
        </div>

        <div>
          <Counter>{{following}}</Counter>
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
} from '@/types'
import Break from '@/components/Break.vue'
import Counter from '@/components/Counter.vue'
import { shortDate } from '@/helpers/date'
import { State } from 'vuex-class'

@Component({
  components: {
    Break,
    Counter
  }
})
export default class UserProfile extends Vue {
  @Prop() private avatarUrl!: string;
  @Prop() private login!: string;
  @Prop() private name!: string;
  @Prop() private createdAt!: string;
  @Prop() private bio!: string;
  @Prop() private followers!: number;
  @Prop() private following!: number;

  @State('githubUri') githubUri?: string;

  githubLink (user: string): string {
    return [this.githubUri, user].join('/')
  }

  formatDate (dateStr: string): string {
    return shortDate(dateStr)
  }
}
</script>
<style lang='scss' scoped>
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
