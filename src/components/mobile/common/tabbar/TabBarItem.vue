<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="isActive">
      <slot name="icon-active"></slot>
    </div>
    <div v-else>
      <slot name="icon"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'TabBarItem',
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) != -1;
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    props:{
      activeColor:{ 
        type:String,
        default:'red' 
      },
      path:String
    },
    methods: {
      itemclick(){ 
        this.$router.push(this.path) 
      }
    },
  }
</script>
<style>
  .tab-bar-item{
    flex: 1; text-align: center; height: 49px;
  }
  .tab-bar-item img{
      display: block; width: 24px; margin: 3px auto;
  }
  .tab-bar-item h4{
      font-size: 14px; font-weight: normal; margin: 0;
  }
  .active{ color:#d4237a;}
</style>