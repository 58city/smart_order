<template>
  <div id="roles-detail">
    <panel tab :tab-titles="['基本信息','权限设置']" @tabClicked="tTab">
      <button slot="button" :disabled="disabled" @click="save"><i class="fa fa-save"></i>保存设置</button>
      <el-form slot="body" :model="roleInfo" :rules="rules" ref="roleInfoForm" label-width="100px">
        <div v-show="currentTab==0">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleInfo.name" @input="formInput"></el-input>
          </el-form-item>
          <el-form-item label="角色说明" prop="description">
            <el-input v-model="roleInfo.description"></el-input>
          </el-form-item>
        </div>
        <div v-show="currentTab==1">
          <el-form-item :label="item.description" v-for="(item,index) in authList" :key="index">
            <el-radio-group v-model="item.select">
              <el-radio :label="0" border>无权限</el-radio>
              <el-radio :label="1" border>仅查看{{item.authorities[0].code}}</el-radio>
              <el-radio :label="2" border>查看和编辑{{item.authorities[1].code}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
    </panel>
  </div>
</template>

<script>
import Panel from 'components/admin/common/panel/Panel'
import {get_auth_list,get_role,create_role} from 'network/admin/roles'
export default {
  name:'RolesCreate',
  data() {
    return {
      authList:[],
      roleInfo:{
        name:'',
        description:'',
        authorities:[]
      },
      rules:{
        name:[
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      currentTab:0,
      disabled:true
    }
  },
  created() {
    this.getAuthorities()
  },
  methods: {
    getAuthorities(){
      get_auth_list().then(res=>{
        this.authList=res.data.filter(item=>{
          return item.code!=100000
        }).map(item=>{
          item.select=0
          return item
        })
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    save(){
      this.disabled=true
      this.roleInfo.authorities=[]
      this.authList.forEach(element => {
        switch(element.select){
          case 0:
          break;
          case 1:
            element.authorities.forEach(item=>{
              if(item.name=='read') this.roleInfo.authorities.push(item.code)
            })
          break;
          case 2:
            element.authorities.forEach(item=>{
              if(item.name=='read') this.roleInfo.authorities.push(item.code)
              if(item.name=='edit') this.roleInfo.authorities.push(item.code)
            })
          break;
        }
      })
      create_role(this.roleInfo).then(res=>{
        this.$message.success('添加成功')
        this.$router.push({name:'role-list'})
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    tTab(index){
      this.currentTab=index
    },
    formInput(){
      this.$refs.roleInfoForm.validate(res=>res ? this.disabled=false : this.disabled=true)
    }
  },
  components:{ Panel }
}
</script>

<style>
  #roles-detail .el-form-item:first-child {
    margin-top: 22px;
  }
</style>