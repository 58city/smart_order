<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="item" :class="{active:currentIndex==index}" class="tab-control-item">
      <span @click="tabCtrlClick(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabControl',
    data() {
      return {
        currentIndex:0
      }
    },
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods: {
      tabCtrlClick(index){
        this.currentIndex=index;
        this.$emit('tabCtrlClick',index);
      }
    },
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
    padding: 5px;
  }
</style>>