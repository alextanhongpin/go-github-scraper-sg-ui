<template>
  <div v-if="colleagues.length">
    <h3>Your Colleagues</h3>
    <break />

    <div class="colleagues">
      <a
        class="colleague"
        v-for="c in myColleagues"
        :key="c.email"
        target="_blank"
        :href="githubLink(c.login)"
      >
        <user-tile v-bind="c"></user-tile>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Action, Getter, State } from 'vuex-class'
import Namespace from '@/models/namespace'
import { User } from '@/types/user'

import Break from '@/components/Break.vue'
import UserTile from '@/components/UserTile.vue'

@Component({
  components: {
    Break,
    UserTile
  }
})
export default class Company extends Vue {
  @Action('fetchColleagues', Namespace.user) fetchColleagues: any
  @Getter('colleagues', Namespace.user) colleagues: User[]

  @Prop() user!: string
  @State('githubUri') githubUri!: string
  @Watch('user')
  onUserChanged (val: User, oldVal: User) {
    this.fetchColleagues(val.company)
  }

  mounted () {
    this.fetchColleagues(this.user.company)
  }

  get myColleagues (): User[] {
    const login = this.user && this.user.login
    if (!login) return []
    return this.colleagues.filter(user => user.login !== login)
  }

  githubLink (login: string): string {
    return `${this.githubUri}/${login}`
  }
}
</script>
<style lang="scss">
@import '@/styles/theme.scss';

.colleagues {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: $dim-100;
  grid-row-gap: $dim-100;
}

.colleague {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
