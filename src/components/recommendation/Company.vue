<template>
  <div v-if="colleagues.length">
    <h3>Your Colleagues</h3>
    <break />

    <div class="colleagues">
      <a
        class="colleague"
        v-for="c in colleagues"
        :key="c.email"
        target="_blank"
        :href="githubLink(c.login)"
      >
        <img class="colleague-profile" :alt="c.name" :src="c.avatarUrl" />
        <div>
          <h4 class="colleague-name">{{ c.login }}</h4>
          <h5>{{ c.name }}</h5>
        </div>
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

@Component({
  components: {
    Break
  }
})
export default class Company extends Vue {
  @Action('fetchCompanyUsers', Namespace.user) fetchCompanyUsers: any
  @Getter('companyUsers', Namespace.user) companyUsers: User[]

  @Prop() user!: string
  @State('githubUri') githubUri!: string
  @Watch('user')
  onUserChanged(val: User, oldVal: User) {
    this.fetchCompanyUsers(val.company)
  }

  mounted () {
    this.fetchCompanyUsers(this.user.company)
  }

  get colleagues (): User[] {
    const login = this.user && this.user.login
    if (!login) return []
    return this.companyUsers.filter(user => user.login !== login)
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
  border: 1px solid #eee;
  border-radius: 5px;
  text-decoration: none;
  color: inherit;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: $dim-100;
  align-items: center;
  padding: $dim-100;
  width: 100%;
}
.colleague-profile {
  width: 60px;
  height: auto;
  border-radius: 5px;
}
.colleague-name {
  font-weight: bold;
}
</style>
