<template>
  <div id="my-account">
    <input type="text" style="position:absolute;top:-10000px;">
    <input type="password" style="position:absolute;top:-10000px;">
    <panel>
      <span slot="title">基本信息</span>
      <button slot="button" @click="save" :disabled="disabled"><i class="fa fa-save"></i>保存设置</button>
      <el-form slot="body" :model="myInfo" :rules="rules" ref="myInfoForm" label-width="100px" status-icon>
        <el-form-item label="角色名称">
          <el-input disabled :value="rolename"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="myInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="管理员昵称" prop="nickname">
          <el-input v-model="myInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="myInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="myInfo.confirm" type="password"></el-input>
        </el-form-item>
        <el-form-item label="上传头像">
          <thumbnail></thumbnail> 
        </el-form-item>
      </el-form>
    </panel>
  </div>
</template>
<script>
  import Panel from 'components/admin/common/panel/Panel'
  import Thumbnail from 'components/admin/common/thumbnail/Thumbnail'
  import {check_user} from 'network/admin/users'
  import {update_account} from 'network/admin/account'
  export default {
    name:'MyAccount',
    data() {
      return {
        myInfo:{
          email:'',
          nickname:'',
          password:'',
          confirm:''
        },
        oldEmail:'',
        oldNickname:'',
        rules:{
          email:[
            { required: true, message: '请输入电子邮箱', trigger: 'change' },
            { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请填写正确的邮箱地址', trigger: 'change' },
            {
              validator:(rule,value,callback)=>{
                if(value==this.oldEmail){
                  return callback()
                }
                check_user({email:value}).then(res=>{
                  res.data=="" ? callback() : callback(new Error('邮箱被占用！'))
                }).catch(err=>{
                  this.$message.error(err.message)
                })
              },
              trigger:'change'
            }
          ],
          nickname:[
            { required: true, message: '请输入用户昵称', trigger: 'change' },
            {
              validator:(rule,value,callback)=>{
                if(value==this.oldNickname){
                  return callback()
                }
                check_user({nickname:value}).then(res=>{
                  res.data=="" ? callback() : callback(new Error('昵称被占用！'))
                }).catch(err=>{
                  this.$message.error(err.message)
                })
              },
              trigger:'change'
            }
          ],
          password:[
            { min: 6, message: '密码不得小于6位', trigger: 'change' },
            {
              validator: (rule, value, callback) => {
                if (this.myInfo.confirm !== '') {
                  this.$refs.myInfoForm.validateField('confirm');
                }
                return callback();
              }, 
              trigger: 'change'
            }
          ],
          confirm:[
            {
              validator: (rule, value, callback) => {
                if (value !== this.myInfo.password) {
                  return callback(new Error('两次输入密码不一致!'));
                } else {
                  return callback();
                }
              }, 
              trigger: 'change'
            }
          ],
        },
        disabled:false
      }
    },
    created() {
      this.get()
    },
    methods: {
      get(){
        this.myInfo.email=this.email
        this.myInfo.nickname=this.nickname
        this.oldEmail=this.email
        this.oldNickname=this.nickname
      },
      save(){
        this.$refs.myInfoForm.validate(res=>{
          this.disabled=true
          if(res){
            let data=Object.assign({},this.myInfo)
            delete data.confirm
            if(data.password.trim().length==0) {
              delete data.password
            }
            update_account(data).then(res=>{
              this.$message.success('账号修改成功')
              this.oldEmail=data.email
              this.oldNickname=data.nickname
              this.$store.commit('setEmail',data.email)
              this.$store.commit('setNickname',data.nickname)
              setTimeout( ()=>this.disabled=false,1000 )
            }).catch(err=>{
              this.$message.error(err.message)
              setTimeout( ()=>this.disabled=false,1000 )
            })
          }
        })
      }
    },
    components:{Panel,Thumbnail},
    computed: {
      email(){
        return this.$store.state.email
      },
      nickname(){
        return this.$store.state.nickname
      },
      rolename(){
        return this.$store.state.rolename
      }
    }
  }
</script>

<style>

</style>