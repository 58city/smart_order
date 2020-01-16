<template>
  <div id="goodscat-create">
    <panel>
      <span slot="title">分类信息</span>
      <button slot="button" @click="add"><i class="fa fa-save"></i>保存设置</button>
      <el-form slot="body"  :model="goodscatInfo" :rules="rules" ref="goodscatInfoForm" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="goodscatInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader-panel 
          :options="parentCatList" :props="{value:'_id',label:'name',children:'children',emitPath:false,checkStrictly:true}" 
          @change="cascaderChange"
          >
          </el-cascader-panel>
        </el-form-item>
      </el-form>
    </panel>
  </div>
</template>

<script>
  import Panel from 'components/admin/common/panel/Panel'
  import { deepQuery } from 'common/utils.js'
  import {get_goodscat,create_goodscat} from 'network/admin/goodscat.js'
  export default {
    name:'GoodsCatCreate',
    data(){
      return {
        topId:'0'.padEnd(24,'0'),
        goodscatInfo:{
          name:'',
          pid:'0'.padEnd(24,'0'),
          level:0
        },
        rules:{
          name:[
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ]
        },
        parentCatList:[]
      }
    },
    created(){
      this.getParentCat()
    },
    methods:{
      add(){
        this.$refs.goodscatInfoForm.validate(res=>{
          if(res){
            create_goodscat(this.goodscatInfo).then(res=>{
              this.$message.success('新增分类成功')
              this.$router.push({name:'goodscat-list'})
            }).catch(err=>{
              this.$message.error(err.message)
            })
          }
        }) 
      },
      getParentCat(){
        get_goodscat({type:2,deleted:false}).then(res=>{
          res.data.list.unshift({_id:this.topId,name:'顶级分类',level:-1,pid:this.topId})
          this.parentCatList=res.data.list
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      cascaderChange(val){
        this.goodscatInfo.pid=val
        this.goodscatInfo.level=deepQuery(this.parentCatList,val).level+1
      }
    },
    components:{Panel}
  }
</script>

<style>

</style>