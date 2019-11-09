<template>
  <div class="recommendation">
    <search-user class="search" />
    <break :px="33" />

    <div class="section" v-if="user">
      <user-profile v-bind="user" />
      <break :px="33" />

      <h3>Your Top Repositories</h3>
      <repositories />
      <break :px="33" />

      <languages header="Your Top Languages" />

      <h3>Your Similar Users</h3>
      <users></users>

      <company v-if="user.company" :user='user'></company>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

// Components.
import Break from '@/components/Break.vue'
import UserProfile from '@/components/UserProfile.vue'
import Company from '@/components/recommendation/Company.vue'
import SearchUser from '@/components/recommendation/Search.vue'
import Users from '@/components/recommendation/Users.vue'
import Languages from '@/components/recommendation/Languages.vue'
import Repositories from '@/components/recommendation/Repositories.vue'

import { User } from '@/types'
import Namespace from '@/models/namespace'

@Component({
  components: {
    Break,
    UserProfile,

    SearchUser,
    Users,
    Languages,
    Repositories,
    Company
  }
})
export default class Recommendation extends Vue {
  @Getter('user', Namespace.match) user?: User
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.search {
  max-width: 360px;
}
</style>
