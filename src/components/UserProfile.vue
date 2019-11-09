<template>
  <div class="user-profile">
    <div class="user-photo-container">
      <img :src="avatarUrl" :alt="login" class="user-photo" />
    </div>

    <div class="user-grid-main">
      <a class="user-login" :href="githubLink(login)" target="_blank"
        ><h1>{{ login }}</h1></a
      >

      <h4 class="user-name" v-if="name">{{ name }}</h4>
      <p class="user-created-at">Member since {{ formatDate(createdAt) }}</p>
      <Break />

      <p class="user-bio" v-if="bio">{{ bio }}</p>
      <Break />

      <div class="counters">
        <div>
          <b>{{ followers }}</b>
          Followers
        </div>

        <div>
          <b>{{ following }}</b>
          Following
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { User } from '@/types'
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
  @Prop() private avatarUrl!: string
  @Prop() private login!: string
  @Prop() private name!: string
  @Prop() private createdAt!: string
  @Prop() private bio!: string
  @Prop() private followers!: number
  @Prop() private following!: number

  @State githubUri?: string

  githubLink (user: string): string {
    return [this.githubUri, user].join('/')
  }

  formatDate (dateStr: string): string {
    return shortDate(dateStr)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.user-profile {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 30px;
}

.user-photo-container {
  background: #eee;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  width: 240px;
  border-radius: 5px;
  overflow: hidden;
}

.user-photo {
  position: absolute;
  width: 100%;
  height: auto;
}

.user-login {
  display: block;
  text-decoration: none;
  color: inherit;
}
.user-name {
}
.user-created-at {
  color: $color-silverlake;
}

.user-bio {
  max-width: 640px;
  background: #eee;
  border-left: 5px solid #ddd;
  padding: 11px;
}

.counters {
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  grid-column-gap: 22px;
}
</style>
