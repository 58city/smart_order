<template>
  <div id="goodscat-update">
    <panel>
      <span slot="title">分类信息</span>
      <button slot="button" @click="edit"><i class="fa fa-save"></i>保存设置</button>
      <el-form slot="body"  :model="goodscatInfo" :rules="rules" ref="goodscatInfoForm" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="goodscatInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader-panel 
          :options="parentCatList" :props="{value:'_id',label:'name',children:'children',emitPath:false,checkStrictly:true}" 
          @change="cascaderChange" :value="goodscatInfo.pid"
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
  import {get_goodscat,update_goodscat} from 'network/admin/goodscat.js'
  export default {
    name:'GoodsCatUpdate',
    data() {
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
    created() {
      this.get(this.$route.params.id)
      this.getParentCat()
    },
    methods: {
      getParentCat(){
        get_goodscat({type:2,deleted:false}).then(res=>{
          res.data.list.unshift({_id:this.topId,name:'顶级分类',level:-1,pid:this.topId})
          this.parentCatList=res.data.list
          function rdel(tree,id) {
            tree.forEach((element,idx) => {
              if(element._id==id){
                tree.splice(idx,1)
              }else if(element.children){
                rdel(element.children,id)
              }
            })
          }
          rdel(this.parentCatList,this.$route.params.id)
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      get(id){
        get_goodscat({id:id}).then(res=>{
          this.goodscatInfo.name=res.data.name
          this.goodscatInfo.pid=res.data.pid
          this.goodscatInfo.level=res.data.level
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      edit(){
        this.$refs.goodscatInfoForm.validate(res=>{
          if(res){
            update_goodscat(this.$route.params.id,this.goodscatInfo).then(res=>{
              this.$message.success('修改分类成功')
              this.$router.push({name:'goodscat-list'})
            }).catch(err=>{
              this.$message.error(err.message)
            })
          }
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