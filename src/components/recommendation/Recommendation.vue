<template>
  <div class="recommendation">
    <Search class="search" />
    <break :px="33" />

    <div class="section" v-if="user">
      <UserProfile v-bind="user" />
      <break :px="33" />

      <h3>Your Top Repositories</h3>
      <repositories />
      <break :px="33" />

      <languages header="Your Top Languages" />

      <h3>Your Similar Users</h3>
      <users></users>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

// Components.
import Break from '@/components/Break.vue'
import UserList from '@/components/UserList.vue'
import UserProfile from '@/components/UserProfile.vue'
import Search from '@/components/recommendation/Search.vue'
import Users from '@/components/recommendation/Users.vue'
import Languages from '@/components/recommendation/Languages.vue'
import Repositories from '@/components/recommendation/Repositories.vue'

import { User } from '@/types'
import Namespace from '@/models/namespace'

@Component({
  components: {
    Break,
    UserProfile,
    UserList,

    Search,
    Users,
    Languages,
    Repositories
  }
})
export default class Recommendation extends Vue {
  @State('user', Namespace.match) user?: User
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.search {
  max-width: 360px;
}
</style>
