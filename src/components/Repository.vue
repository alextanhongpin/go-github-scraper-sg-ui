<template>
  <div class="repository">
    <a class="hover-link">
      <i class="fa fa-external-link-alt"></i> View Repository
    </a>
    <div class="repo-header">
      <h6 class="repo-created-at">Created {{ formatDate(createdAt) }}</h6>
      <h4 class="repo-name">
        {{ name }}
      </h4>

      <p class="repo-description" v-if="description">
        {{ description }}
      </p>

      <break />
      <h6 class="repo-topic" v-for="topic in sortedTopics" :key="topic">
        {{ topic }}
      </h6>
      <break />
    </div>
    <h6 class="repo-stats">
      <language-cell
        :label="primaryLanguage"
        class="repo-language"
      ></language-cell>
      <div class="repo-stargazers" title="stargazers">
        <i class="icon-star fa fa-star"></i>&nbsp; {{ stargazers }}
      </div>
      <div class="repo-watchers" title="watchers">
        <i class="icon-eye fa fa-eye"></i>&nbsp; {{ watchers }}
      </div>
      <div class="repo-forks" title="forks">
        <i class="icon-forks fa fa-code-branch"></i>&nbsp; {{ forks }}
      </div>
    </h6>
  </div>
</template>
<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator'
import Break from '@/components/Break.vue'
import LanguageCell from '@/components/LanguageCell.vue'

import { shortDate } from '@/models/date'

@Component({
  components: {
    Break,
    LanguageCell
  }
})
export default class Repository extends Vue {
  @Prop() name!: string
  @Prop() createdAt!: string
  @Prop() description!: string
  @Prop() topics!: string[]
  @Prop() primaryLanguage!: string
  @Prop() stargazers!: number
  @Prop() watchers!: number
  @Prop() forks!: number

  formatDate (dateStr: string): string {
    return shortDate(dateStr)
  }

  get sortedTopics (): string[] {
    if (!this.topics) return []
    return this.topics.sort()
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.repository {
  border: 1px solid #dddddd;
  padding: $dim-300;
  background: white;
  border-radius: 5px;
  display: grid;
  justify-content: space-between;
  grid-template-rows: 1fr $dim-300;
  height: 100%;
  position: relative;
}
.repository:hover {
  border: 1px solid #bbb;
}
.repository:hover > .hover-link {
  display: block;
}
.hover-link {
  position: absolute;
  top: $dim-100;
  right: $dim-100;
  display: none;
}
.repo-name {
  font-weight: bold;
}

.repo-stargazers,
.repo-watchers,
.repo-forks {
  vertical-align: middle;
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
  grid-template-columns: repeat(4, max-content);
  grid-column-gap: $dim-200;
  align-items: center;
}

$dim-topic: #{$dim-300/2};
.repo-topic {
  display: inline-block;
  background: #eee;
  margin: 0 8px 5px 0;
  padding: 0 $dim-topic;
  border-radius: $dim-topic;

  height: $dim-400;
}

.icon-star,
.icon-eye,
.icon-forks {
  font-size: $dim-200;
  color: #666;
}
</style>
