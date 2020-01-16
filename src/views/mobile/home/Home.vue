<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精品']" @tabCtrlClick="toggleGoods" ref="tabCtrlFixed" class="fixed" v-show="isFixed">   
    </tab-control>
    <scroll :click="true" :probeType="3" @scroll="conScroll" :pullUpLoad="true" @pullingUp="loadMore" ref="scroll"> 
      <home-swiper :banners="banners" @imgLoad="bannerImgLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <tab-control :titles="['流行','新款','精品']" @tabCtrlClick="toggleGoods" ref="tabCtrl"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShow"></back-top>
  </div>
</template>
 
<script>
  // 引入子组件
  import Scroll from 'components/mobile/common/scroll/Scroll'
  import NavBar from 'components/mobile/common/navbar/NavBar'
  import TabControl from 'components/mobile/content/tabControl/TabControl'
  import GoodsList from 'components/mobile/content/goods/GoodsList'
  import BackTop from 'components/mobile/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  // 引入网络请求api
  import {getHomeMultidata,getHomeGoods} from 'network/mobile/home'
  // 引入工具方法
  import {debounce} from 'common/utils'

  export default {
    name:"Home",
    data() {
      return {
        banners:[],
        recommends:[],
        goods:{
          'popu':{page:0,list:[]},
          'news':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'popu',
        isShow:false,
        tabCtrlTop:0,
        isFixed:false,
        saveY:0
      }
    },
    components:{
      Scroll,NavBar,TabControl,GoodsList,BackTop,HomeSwiper,HomeRecommend
    },
    created() {
      this.getMultidata()
      this.getGoods('popu')
      this.getGoods('news')
      this.getGoods('sell')
    },
    mounted() {
      let refresh=debounce(this.$refs.scroll.refresh)
      this.$bus.$on('imgLoad',()=>{
        refresh()
      })
    },
    methods: {
      // 网络请求相关方法
      getMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.homeData.banner
          this.recommends = res.data.homeData.recommend
        })
      },
      getGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.homeGoods)
          this.goods[type].page+=1
          this.$refs.scroll.finishPullUp()
        })
      },
      // 事件监听相关方法
      toggleGoods(index){
        switch(index){
          case 0:
            this.currentType='popu'
            break;
          case 1:
            this.currentType='news'
            break;
          case 2:
            this.currentType='sell'
            break;
        }
        this.$refs.tabCtrlFixed.currentIndex=index
        this.$refs.tabCtrl.currentIndex=index
      },
      backTopClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      conScroll(pos){
        this.isShow=-pos.y>500
        this.isFixed=-pos.y>=this.tabCtrlTop
      },
      loadMore(){
        this.getGoods(this.currentType)
      },
      bannerImgLoad(){
        this.tabCtrlTop=this.$refs.tabCtrl.$el.offsetTop
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY=this.$refs.scroll.y()
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
  .fixed{
    position: fixed;
    z-index: 100;
  }
</style>