
<template>
  <div class='card'>
    <div class='user-tag'>
      <img class='image' :src='user.avatarUrl'/>
      <div>
        <b class='login'>{{user.login}}</b>
        <small>&nbsp;({{user.name}})</small>
      </div>
    </div>
    <div class='company' v-if='user.company'>
      @{{user.company}}
    </div>
    <div class='bio'>
      {{user.bio}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import User from '@/models/user'

@Component
export default class GithubCard extends Vue {
  @Prop() private user?: User;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  height: 160px;
  width: 240px;
  display: inline-block;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

$image-dimension: 40px;
$color-gray: #DDD;

.user-tag {
  vertical-align: middle;
  display: grid;
  grid-template-columns: $image-dimension 1fr;
  grid-column-gap: 10px;
  align-items: center;
}

.image {
  background: $color-gray;
  box-shadow: 0 5px 15px rgba(0, 0, 0, .2);
  width: $image-dimension;
  height: $image-dimension;
}
.name {
}
.bio {
  font-size: small;
}
</style>
