<template functional>
  <a
    class='component'
    target='_blank'
    :href="'https://github.com/' + props.login"
    >
    <img class='photo' :src='props.avatarUrl'/>
    <div class='info'>
      <b class='login'> {{ props.login }} </b>
      <div class='name'> {{ props.name }} </div>
    </div>
  </a>
</template>
<style lang='scss' scoped>
@import '@/styles/theme.scss';
.component {
  display: grid;
  grid-template-columns: $dim-600 1fr;
  grid-column-gap: $dim-100;
  // For overriding link.
  text-decoration: none;
  color: inherit;
  width: 100%;
  align-items: center;
  border-radius: 5px;
}

.component:hover {
  box-shadow: 0 5px 15px rgba(black, 0.2);
  background: #EEEEEE;
}

.photo {
  height: $dim-600;
  width: auto;
  background: $color-silverlake;
  border-radius: 50%;
  vertical-align: middle;
}

// For ellipsis to work in the grid-layout, apply it to the parent container;
.info {
  overflow: hidden;
}
.login {
  font-weight: 600;
}
.name {
  @extend %h6;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.header {
  margin: 0 $dim-100;
  font-weight: 600;
  @extend %h4;
}
</style>
