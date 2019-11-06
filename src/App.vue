<template>
  <div id="app">
    <header class="header">
      <span class="brand">{{ brand }}</span
      >&nbsp;<span class="brand-app">Recommender</span>
      <small> version {{ version }} </small>
    </header>

    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

@Component
export default class App extends Vue {
  // HINT: To fetch a key in the rootState.
  @State('brand') brand?: string
  @State('version') version?: string
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
@import '@/styles/reset.scss';
@import '@/styles/theme.scss';

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
  font-family: 'Open Sans', sans-serif;
}
#app {
  @extend %h5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

small {
  @extend %h6;
}

.header {
  height: 80px;
  line-height: 80px;
  @extend %h3;
  padding: 0 30px;
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
}
</style>
