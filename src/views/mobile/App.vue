<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <tab-bar-main></tab-bar-main>
  </div>
</template>
<script>
  import TabBarMain from "components/mobile/content/tabbar/main";
  export default {
    name: 'App',
    components:{ TabBarMain }
  }
</script>
<style>
  @import url(~assets/mobile/css/base.css);
</style>