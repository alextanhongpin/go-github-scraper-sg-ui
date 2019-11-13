<template>
  <div id="app">
    <header class="app-header">
      <router-link to="/" class="app-header-link">
        <span class="brand">{{ brand }}</span
        >&nbsp;<span class="brand-app">Recommender</span>
        <small> version {{ version }} </small>
      </router-link>
    </header>

    <main class="app-main">
      <router-view />
    </main>
    <footer class="app-footer">
      🏃 Designed by
      <a href="mailto:alextan220990@gmail.com">Alex Tan Hong Pin.</a> &copy;
      {{ new Date().getFullYear() }}.
    </footer>
    <break :px="33" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import Break from '@/components/Break.vue'

@Component({
  components: {
    Break
  }
})
export default class App extends Vue {
  // HINT: To fetch a key in the rootState.
  @State brand?: string
  @State version?: string
}
</script>

<style lang="scss">
@import '@/styles/reset.scss';
@import '@/styles/theme.scss';

@import url('https://fonts.googleapis.com/css?family=Cairo:300,400,700&display=swap');

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
img {
  box-sizing: content-box;
}

#app,
input,
textarea,
button {
  font-family: 'Cairo', sans-serif;
}
#app {
  @extend %h5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #345;
}

small {
  @extend %h6;
}

.app-header {
  height: 80px;
  line-height: 80px;
  @extend %h3;
  padding: 0 30px;
}
.app-header-link {
  text-decoration: none;
  color: inherit;
}

.brand {
  font-weight: bold;
}

.brand-app {
}

.app-main {
  max-width: 1140px;
  width: 100%;
  margin: auto;
  padding: $dim-100;
}
.app-footer {
  text-align: center;
}
</style>
