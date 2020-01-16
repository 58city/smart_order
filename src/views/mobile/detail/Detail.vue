<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImgs="topImgs"></detail-swiper>
    <detail-good-info :good="goodsInfo"></detail-good-info>
  </div>
</template>
<script>
// 导入页面组件相关模块
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailGoodInfo from './childComps/DetailGoodInfo'
// 导入网络请求相关模块
import {getDetail,goodsInfo} from 'network/mobile/detail'
export default {
  name:'Detail',
  data() {
    return {
      goodsId:'',topImgs:[],goodsInfo:{}
    }
  },
  created() {
   this.goodsId=this.$route.params.id 
   this.getDetail(this.goodsId)
  },
  methods: {
    getDetail(id){
      getDetail(id).then(res=>{
        let data=res.data.result
        this.topImgs=data.itemInfo.topImgs
        this.goodsInfo=new goodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      })
    }
  },
  components:{DetailNavBar,DetailSwiper,DetailGoodInfo}
}
</script>

<style scoped>

</style>