<template>
  <div id="widget">
    <div class="widget-header">
      <h2 v-if="!tab"><slot name="title"></slot></h2>
      <ul class="widget-tabs" v-if="tab">
        <li v-for="(item,index) in tabTitles" :key="index" @click="toggleTab(index)" :class="{active:index==currentTabIndex}">
          {{item}}
        </li>
      </ul>
      <div class="widget-search" v-if="search">
        <input type="text" v-model="searchContent" placeholder="请输入搜索内容">
        <span @click="searchSubmit"><i class="fa fa-search"></i></span>
      </div>
      <div class="widget-ctrls">
        <slot name="button"></slot>
      </div>
    </div>
    <div class="widget-body">
      <slot name="body"></slot>
    </div>
    <div class="widget-footer" v-if="footer">
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  data() {
    return {  
      searchContent:'',
      currentTabIndex:0,
    }
  },
  props:{
    tab:{
      type:Boolean,
      default:false
    },
    tabTitles:{
      type:Array,
      default(){
        return []
      }
    },
    search:{
      type:Boolean,
      default:false
    },
    footer:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    toggleTab(index){
      this.currentTabIndex=index
      this.$emit('tabClicked',this.currentTabIndex)
    },
    searchSubmit(){
      this.$emit('searchClicked',this.searchContent)
    }
  }
}
</script>

<style scoped>
#widget {
  zoom: 1;
}
#widget:after {
  display: block;
  content: "\0020";
  height: 0;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  visibility: hidden;
  clear: both;
}
#widget > .widget-header {
  height: 45px;
  color: #333;
  border: 1px solid #EBEEF5;
  background: #f5f5f5;
}
/* 标题 */
#widget > .widget-header h2 {
  height: 100%;
  line-height: 45px;
  font-size: 14px;
  margin-left: 13px;
  float: left;
}
/* 搜索框 */
#widget > .widget-header .widget-search {
  display: table;
  border-collapse: separate;
  width: 200px;
  margin: 2px 0 0 10px;
  float: left;
}
#widget > .widget-header .widget-search input {
  display: table-cell;width: 100%;
  padding: 6px 12px;
  height: 28px;
  line-height: 28px;
  border: 1px solid #ddd;border-right: 0;
  outline: none;
}
#widget > .widget-header .widget-search span {
  display: table-cell;
  padding: 6px 12px;
  line-height: 1;
  border: 1px solid #ddd;
  background-color: #eee;
  cursor: pointer;     
}
#widget > .widget-header .widget-search span:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
/* tab切换栏 */
#widget > .widget-header .widget-tabs {
  float: left;
  list-style: none;
}
#widget > .widget-header .widget-tabs > li{
  float: left;
  height: 43px;
  line-height: 43px;
  padding: 0 10px;
  cursor: pointer;
}
#widget > .widget-header .widget-tabs > li:hover{
  color: #3276b1;
}
#widget > .widget-header .widget-tabs > li.active, 
#widget > .widget-header .widget-tabs > li.active:focus, 
#widget > .widget-header .widget-tabs > li.active:hover{
  background-color: #fff;
  color: #3276b1;
}
/* 按钮区域 */
#widget > .widget-header .widget-ctrls {
  float: right;
}
#widget > .widget-header .widget-ctrls button{
  display: inline-block;
  height: 43px;
  line-height: 43px;
  padding: 0 6px;
  border: none;border-left: 1px solid rgba(0, 0, 0, 0.09);
  outline: none;background: none;
  cursor: pointer;
}
#widget > .widget-header .widget-ctrls button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
#widget > .widget-header .widget-ctrls button:disabled{
  cursor: not-allowed;
}
#widget > .widget-header .widget-ctrls button i{
  margin-right: 4px;
}
/* 主题区域 */
#widget > .widget-body {
  padding: 13px;
  font-size: 13px;
  border: 1px solid #EBEEF5;
  border-top-width: 0;
  background-color: #fff;
}
#widget > .widget-body > .table {
  margin-bottom: 0;
}
/* 底部 */
#widget > .widget-footer {
  min-height: 41px;
  background-color: #eee;
  padding: 8px 13px;
  border: 1px solid #ddd;
  border-top: none;
}
#widget > .widget-footer .pagination {
  margin: 0;
}
#widget > .widget-footer .pagination > li > a {
  padding: 2px 7px;
}
</style>
