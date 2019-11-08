<template>
  <div class="repository">
    <div class="repo-header">
      <h6 class="repo-created-at">Created {{ formatDate(createdAt) }}</h6>
      <h4 class="repo-name">
        {{ name }}
      </h4>
      <break />

      <p class="repo-description" v-if="description">
        {{ description }}
      </p>
      <break />

      <h6 class="repo-topic" v-for="topic in topics" :key="topic">
        {{ topic }}
      </h6>
      <break />
    </div>
    <h6 class="repo-stats">
      <language-cell
        :label="primaryLanguage"
        class="repo-language"
      ></language-cell>
      <div class="repo-stargazers">★ {{ stargazers }}</div>
    </h6>
  </div>
</template>
<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator'
import Break from '@/components/Break.vue'
import LanguageCell from '@/components/LanguageCell.vue'

import { shortDate } from '@/helpers/date'

@Component({
  components: {
    Break,
    LanguageCell
  }
})
export default class Repository extends Vue {
  @Prop() name: string
  @Prop() createdAt: string
  @Prop() description: string
  @Prop() topics: string[]
  @Prop() primaryLanguage: string
  @Prop() stargazers: number

  formatDate (dateStr: string): string {
    return shortDate(dateStr)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.repository {
  border: 1px solid #dddddd;
  padding: $dim-300;
  background: white;
  min-height: 240px;
  border-radius: 7px;
  display: grid;
  justify-content: space-between;
  grid-template-rows: 1fr $dim-300;
  height: 100%;
  transition: 0.134s all ease-out;
}
.repository:hover {
  box-shadow: 0 5px 15px rgba(black, 0.2);
  transform: translate3d(0, -5px, 0);
}
.repo-name {
  font-weight: 600;
}
.repo-description {
}
.repo-stargazers {
}
.repo-language {
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  grid-column-gap: 5px;
  align-items: center;
}
.repo-created-at {
  color: $color-silverlake;
}
.repo-stats {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-column-gap: $dim-100;
  align-items: center;
  height: $dim-300;
}

$dim-topic: #{$dim-300/2};
.repo-topic {
  background: #eee;
  display: inline-block;
  margin: 0 8px 5px 0;
  padding: 0 $dim-topic;
  border-radius: $dim-topic;
  height: $dim-400;
}
</style>
