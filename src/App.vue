<template>
  <div id="app">
    <header>
      <span class='brand'>Github</span>&nbsp;<span class='brand-app'>Recommender</span>
    </header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat');
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

#app, input, textarea {
  font-family: 'Montserrat', sans-serif;
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

header {
  height: 60px;
  line-height: 60px;
  @extend %h3;
  padding: 0 10px;
}

.brand {
  font-weight: bold;
}
.brand-app {
  @extend %h4;
}
</style>
