<template>
  <div id="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" :to="{ path: (index==0?'/':item.path) }">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    
  </div>
</template>

<script>
export default {
  name:'LayoutBreadcrumb',
  watch: {
    $route: {
      handler: function(val, oldVal){
        // console.log(val);
      },
      deep: true
    }
  }
}
</script>

<style>
  #breadcrumb{
    margin-top: 13px;
  }
  #breadcrumb span{
    color: #BBB!important;
  }
</style>