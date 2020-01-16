<template>
  <swiper>
    <swiper-item v-for="(item,index) in topImgs" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper> 
</template>

<script>
import {Swiper,SwiperItem} from 'components/mobile/common/swiper'
export default {
  name:'DetailSwiper',
  components:{
    Swiper,SwiperItem
  },
  props:{
    topImgs:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>