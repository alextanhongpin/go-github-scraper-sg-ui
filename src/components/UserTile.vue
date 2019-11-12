<template>
  <div class="user-tile">
    <img class="user-tile-profile" :alt="name" :src="avatarUrl" />
    <div>
      <h4 class="user-tile-name ellipsis">{{ login }}</h4>
      <h5 class="ellipsis">{{ name }}</h5>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class UserTile extends Vue {
  @Prop() login!: string
  @Prop() name!: string
  @Prop() avatarUrl!: string
}
</script>
<style lang="scss">
@import '@/styles/theme.scss';

.user-tile {
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
.user-tile-profile {
  width: 60px;
  height: auto;
  border-radius: 5px;
}
.user-tile-name {
  font-weight: bold;
}
</style>
