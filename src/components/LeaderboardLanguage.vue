<template>
  <div class="leaderboard-language">
    <div class="header">
      Top Languages
    </div>
    <Break px="5" />
    <div class="subheader">
      Based on the number of repositories
    </div>
    <Break px="21" />
    <div class="language-cells">
      <div :label="item.name" v-for="item in items">
        <span
          :style="{
            background: color(item.name),
            opacity: opacity(i, item.count)
          }"
          v-for="i in percentage(item.count)"
          class="circle"
        ></span>
        {{ item.name }}
        ({{ percentage(item.count) }}%)
        <span class="repo-count">{{ formatCount(item.count) }} repos</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Leaderboard } from '@/types'
import LanguageCell from '@/components/LanguageCell.vue'
import Break from '@/components/Break.vue'
import * as Color from '@/helpers/color'

@Component({
  components: {
    Break,
    LanguageCell
  }
})
export default class LeaderboardLanguage extends Vue {
  @Prop() private name!: string
  @Prop({ default: [] }) private items!: Leaderboard[]
  @Prop({ default: 0 }) private totalCount!: number

  percentage (count: number): number {
    return Math.ceil((count / this.totalCount) * 100)
  }
  formatCount (count: number): string {
    return count.toLocaleString()
  }
  color (label: string): string {
    return Color.pick(label)
  }
  opacity (index: number, count: number): number {
    const value = this.percentage(count)
    return (value - index + 1) / value
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';
.leaderboard-language {
  padding: $dim-300;
  box-shadow: 0 5px 15px rgba(black, 0.2);
  margin: $dim-300;
}
.header {
  @extend %h5;
  font-weight: bold;
}
.subheader {
  @extend %subheader;
}
.language-cells {
  @extend %h6;
  display: grid;
  grid-auto-flows: columns;
  grid-row-gap: $dim-50;
}
.language-cell {
  display: grid;
  grid-template-columns: $dim-50 1fr;
  align-items: center;
  grid-column-gap: $dim-50;
}
.circle {
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  width: 10px;
  margin: 0 1px;
}
.repo-count {
  @extend %subheader;
}
</style>
