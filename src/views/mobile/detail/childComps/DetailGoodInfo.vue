<template>
  <div class="good-info" v-if="Object.keys(good).length !==0">
    {{good}}
  </div>
</template>

<script>
export default {
  name:'DetailGoodInfo',
  props:{
    good:Object
  }
}
</script>

<style scoped>

</style>