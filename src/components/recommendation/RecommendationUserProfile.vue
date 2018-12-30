<template>
  <div v-if='user'>
    <slot v-bind='user'></slot>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import {
  User,
  Namespace
} from '@/models'

// HINT: This container is purely for setting the data - it's similar like
// a react container.
@Component
export default class RecommendationUserProfile extends Vue {
  @State('user', Namespace.recommendation) user?: User;
}
</script>
