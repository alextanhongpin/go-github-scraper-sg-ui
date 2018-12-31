<template>
  <div class='recommendation'>
    <RecommendationSearchUserInput class='search-user-input-section'/>

    <Break px='21'/>

    <div class='section' v-if='user'>
      <div class='aside'>
        <RecommendationUserProfile class='user-profile-section'>
          <UserProfile slot-scope='user' v-bind='user'/>
        </RecommendationUserProfile>
      </div>
      <div class='main'>

        <RecommendationRepositories/>

        <Break px='21'/>

        <RecommendationLanguages
          header='Repository Summary'
        />

        <Break px='21'/>

        <!-- <RecommendationSimilarUsers -->
        <!--   header='Similar Users' -->
        <!-- > -->
        <!--   <UserList -->
        <!--     slot-scope='user' -->
        <!--     :key='user.login' -->
        <!--     :login='user.login' -->
        <!--     :name='user.name' -->
        <!--     :avatarUrl='user.avatarUrl' -->
        <!--   /> -->
        <!-- </RecommendationSimilarUsers> -->

      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

// Components.
import Break from '@/components/Break.vue'
import UserList from '@/components/UserList.vue'
import UserProfile from '@/components/UserProfile.vue'
import RecommendationUserProfile from '@/components/recommendation/RecommendationUserProfile.vue'
import RecommendationSearchUserInput from '@/components/recommendation/RecommendationSearchUserInput.vue'
import RecommendationSimilarUsers from '@/components/recommendation/RecommendationSimilarUsers.vue'
import RecommendationLanguages from '@/components/recommendation/RecommendationLanguages.vue'
import RecommendationRepositories from '@/components/recommendation/RecommendationRepositories.vue'

import { User, Namespace } from '@/models'

@Component({
  components: {
    Break,
    UserProfile,
    UserList,

    RecommendationUserProfile,
    RecommendationSearchUserInput,
    RecommendationSimilarUsers,
    RecommendationLanguages,
    RecommendationRepositories
  }
})
export default class Recommendation extends Vue {
  @State('user', Namespace.recommendation) user?: User;
}
</script>
<style lang='scss' scoped>
@import '@/styles/theme.scss';
.recommendation {
}

.search-user-input-section {
  margin: 0 $dim-300;
  max-width: 360px;
}

.section {
  margin: 0 $dim-300;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-column-gap: $dim-300;
}

@media (max-width: 640px) {
  .search-user-input-section {
    max-width: 100%;
  }
  .section {
    grid-auto-flow: row;
    grid-row-gap: $dim-300;
    grid-template-columns: 1fr;
  }
  .aside {
    padding: 0 0 $dim-300 0;
    border-bottom: 1px solid #EEEEEE;
    text-align: center;
  }
}

</style>

