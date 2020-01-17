<template>
  <div id="goods-list">
    <el-card>
      <el-alert show-icon title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false"></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
          v-model="selectedCatKeys"
          :options="goodscatList"
          :props="{ value: '_id',label:'name', children:'children'}"
          @change="handleCascaderChange">
          </el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="selectedCatKeys.length!=3">添加参数</el-button>
          <el-table :data="manyData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="selectedCatKeys.length!=3">添加属性</el-button>
          <el-table :data="onlyData" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import {get_goodscat} from 'network/admin/goodscat.js'
  export default {
    name:'GoodsList',
    data() {
      return {
        goodscatList:[],
        selectedCatKeys:[],
        activeName:'many',
        manyData:[],
        onlyData:[]
      }
    },
    created(){
      this.getCatList()
    },
    methods: {
      getCatList(){
        get_goodscat({deleted:false}).then(res=>{
          this.goodscatList=res.data.list
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      getParamsData(){
        if(this.selectedCatKeys.length!=3){
          this.selectedCatKeys.length=[]
          return 
        }
        this.$http.get(`categories/${this.selectedCatKeys[2]}/attributes`,{
          params:{sel:this.activeName}
        }).then(res=>{
          if(this.activeName=='many'){
            this.manyData=res.data
          }else{
            this.onlyData=res.data
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      handleCascaderChange(){
        this.getParamsData()
      },
      handleTabClick(){
        this.getParamsData()
      }
    },

  }
</script>

<style scoped>
  .cat_opt{
    margin: 15px 0;
  }
</style>