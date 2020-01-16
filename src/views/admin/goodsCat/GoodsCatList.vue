<template>
  <div id="goodscat-list">
    <data-table 
    :data="goodsCatList" :editable="auths.goods_cat.edit"
    @addClicked="add" @delClicked="delMany"
    @checkboxChange="checkAll" @searchChange="search" 
    footer :query-info="queryInfo" :total="total"
    @sizeChange="sizeChange" @currentChange="currentChange"
    >
      <el-table-column label="分类名称" prop="name" width="300px"></el-table-column>
      <el-table-column label="状态" width="">
        <template slot-scope="scope">
          <i v-if="!scope.row.deleted" class="el-icon-success" style="color:green"></i>
          <i v-else class="el-icon-error" style="color:red"></i>
        </template>
      </el-table-column>
      <el-table-column label="级别">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.level==0">一级</el-tag>
          <el-tag size="mini" v-if="scope.row.level==1" type="success">二级</el-tag>
          <el-tag size="mini" v-if="scope.row.level==2" type="warning">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="143px">
        <template slot-scope="scope" >
          <el-button size="mini" @click="edit(scope.$index, scope.row)" :disabled="!auths.goods_cat.edit">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)" :disabled="!auths.goods_cat.edit">删除</el-button>
        </template>
      </el-table-column>
    </data-table>
  </div>
</template>

<script>
import DataTable from 'components/admin/common/dataTable/DataTable'
import { RdeepDelete } from 'common/utils.js'
import {get_goodscat,delete_goodscat} from 'network/admin/goodscat.js'
export default {
  name:'GoodsCatList',
  data() {
    return {
      goodsCatList:[],
      queryInfo:{
        type:3,
        currentPage:1,
        pageSize:5,
        deleted:false
      },
      total:0,
      checked:[]
    }
  },
  created(){
    this.get()
  },
  methods:{
    add(){
      this.$router.push({name:'goodscat-create'})
    },
    del(index,row){
      this.$confirm('点击确定将会删除此分类及其子分类, 是否继续?', '删除分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_goodscat({id:row._id}).then(res=>{
          this.$message.success('删除成功')
          // 同步视图
          RdeepDelete(this.goodsCatList,row._id)
        }).catch(err=>{
          this.$message.error(err.message)
        })
      })
    },
    edit(index,row){
      this.$router.push({name:'goodscat-update',params:{id:row._id}})
    },
    get(){
      get_goodscat(this.queryInfo).then(res=>{
        this.goodsCatList=res.data.list
        this.total=res.data.total
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    checkAll(val){
      this.checked=val
    },
    delMany(){
      if(this.checked.length==0){
        this.$message.error('请选择需要删除的分类')
        return false
      }
      this.$confirm('此操作将会删除当前分类及其子分类, 是否继续?', '删除分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.checked)
      })
    },
    search(content){

    },
    sizeChange(val){
      this.queryInfo.pageSize=val
      this.get()
    },
    currentChange(val){
      this.queryInfo.currentPage=val
      this.get()
    }
  },
  components:{
    DataTable
  },
  computed: {
    auths(){
      return this.$store.getters.getAuths
    }
  }
}
</script>

<style>
</style>