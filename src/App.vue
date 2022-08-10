<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view></router-view>
    <h2>1</h2>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
.box {
  width: 375px;
  height: 100px;
  background-color: pink;
}
</style>
