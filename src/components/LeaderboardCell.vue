<template>
  <div class="leaderboard">
    {{name}} {{count}}
  </div>
</template>

<script lang="ts">
// HINT: Always name the component with <name>-<type of component>.
// This gives better idea on what the components are, and also avoid clashing
// in naming conventions.
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LeaderboardCell extends Vue {
  @Prop() private name!: string;
  @Prop() private count!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
</style>
