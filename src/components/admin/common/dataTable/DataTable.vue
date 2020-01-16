<template>
  <div id="data-table">
    <div class="data-table-header">
      <el-button icon="el-icon-plus" size="mini" @click="addClicked" :disabled="!editable"></el-button>
      <el-button icon="el-icon-delete" size="mini" @click="delClicked" :disabled="!editable"></el-button>
      <el-input v-model="search" size="mini" placeholder="输入关键字搜索" @input="searchChange"/>
    </div>
    <el-table 
    :data="data" row-key="_id"
    ref="table" border default-expand-all
    @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <slot></slot>
    </el-table>
    <el-pagination
      :total="total"
      :current-page="queryInfo.currentPage"
      :page-size="queryInfo.pageSize"
      :page-sizes="[5, 10, 15, 20]"
      @size-change="sizeChange"
      @current-change="currentChange"
      layout="total, sizes, prev, pager, next, jumper"
      v-if="footer"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'DataTable',
  data() {
    return {
      search:'',
      timer:null
    }
  },
  methods: {
    addClicked(){
      this.$emit('addClicked')
    },
    delClicked(){
      this.$emit('delClicked')
    },
    searchChange(){
      if(this.timer) clearTimeout(this.timer)
      this.timer=setTimeout(()=>{
        this.$emit('searchChange',this.search)
      },600)
    },
    selectionChange(val){
      this.$emit('checkboxChange',val)
    },
    sizeChange(val){
      this.$emit('sizeChange',val)
    },
    currentChange(val){
      this.$emit('currentChange',val)
    }
  },
  props:{
    data:{
      type:Array,
      default(){
        return []
      }
    },
    footer:{
      type:Boolean,
      default:false
    },
    editable:{
      type:Boolean,
      default:true
    },
    queryInfo:{
      type:Object,
      default(){
        return {}
      }
    },
    total:{
      type:Number,
      default:0
    }
  }
}
</script>

<style scoped>
  #data-table .el-pagination{
    border:1px solid #EBEEF5;
    border-top:none;
    padding:12px;
    display:flex;
    justify-content: flex-end;
  }
  #data-table .el-pagination>:nth-child(1){
    display:flex;
    justify-content: flex-start;
    margin-right: 0px;
  }
  #data-table .el-pagination>:nth-child(2){
    display:flex;
    flex-grow: 1;
    justify-content: flex-start;
  }
  #data-table .data-table-header{
    background-color: #f5f5f5;
    border:1px solid #EBEEF5;
    border-bottom:none;
    padding:8px;
    overflow: hidden;
  }
  #data-table .data-table-header .el-button--mini{
    padding: 7px;
    margin-left: 0;
    margin-right: 4px;
    background-color: #f5f5f5;
    float: left;
  }
  #data-table .data-table-header .el-input--mini{
    width:200px;
    float: right;
  }
</style>