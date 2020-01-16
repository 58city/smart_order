<template>
  <div class="back-top">
    <i class="fa fa-arrow-up"></i>
  </div>
</template>

<script>
  export default {
    name:'BackTop'
  }
</script>

<style scoped>
  .back-top{
    position: fixed;
    bottom: 60px;
    right: 10px;
    z-index: 999;
    width: 42px;
    height: 42px;line-height: 42px;
    text-align: center;
    border-radius: 50%;
    font-size: 20px;color: orange;
    background-color: #fff;
  }
</style>