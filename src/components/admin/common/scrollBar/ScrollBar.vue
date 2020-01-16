<template>
  <happy-scroll color="rgba(0,0,0,0.5)" size="5" resize hide-horizonta>
    <slot></slot>
  </happy-scroll>
</template>

<script>
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
export default {
  name:'ScrollBar',
  components:{
    HappyScroll
  }
}
</script>

<style scoped>

</style>