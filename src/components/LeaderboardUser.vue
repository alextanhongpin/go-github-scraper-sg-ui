<template>
  <div class='container'>
    <div class='header'>
      <div class='image'></div>
      <div>
        <div class='name'>
          {{name}}
        </div>
        <div>
          {{count}}
        </div>
      </div>
    </div>

    <div class='info'>
      <div class='language'>
        <div class='icon-language'></div>
        <div>68%</div>
        <div>JavaScript</div>
      </div>
      <div class='language'>
        <div class='icon-language'></div>
        <div>68%</div>
        <div>JavaScript</div>
      </div>
      <div class='language'>
        <div class='icon-language'></div>
        <div>68%</div>
        <div>JavaScript</div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class LeaderboardUser extends Vue {
  @Prop() private name!: string;
  @Prop({default: 0}) private count!: number;
}
</script>
<style scoped lang='scss'>

.container {
  border-bottom: 1px solid #EEE;
  display: grid;
  grid-template-columns: minmax(120px, 240px) 1fr;
  grid-column-gap: 10px;
}
.header {
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-column-gap: 10px;
}

.image {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: #DDD;
}

.name {
  font-weight: bold;
}

.language {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.icon-language {
  height: 20px;
  width: 20px;
  background: red;
  border-radius: 50%;
  position: relative;
}
.icon-language::after {
  content: '';
  position: absolute;
  border-radius: 10px;
  width: 200px;
  height: 20px;
  display: block;
  background: linear-gradient(45deg, rgba(red, 0.4), white);
}
</style>
