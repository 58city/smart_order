<template>
  <div id="admins-detail">
    <input type="text" style="position:absolute;top:-10000px;">
    <input type="password" style="position:absolute;top:-10000px;">
    <panel>
      <span slot="title">基本信息</span>
      <button slot="button" @click="add"><i class="fa fa-save"></i>保存设置</button>
      <el-form slot="body" :model="adminInfo" :rules="rules" ref="adminInfoForm" label-width="100px">
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="adminInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="管理员昵称" prop="nickname">
          <el-input v-model="adminInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input v-model="adminInfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="adminInfo.confirm" type="password"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色" prop="role" :error="rolesError?'角色列表读取失败':''">
          <el-select v-model="adminInfo.role" placeholder="请选择角色" style="width:100%">
            <el-option v-for="(item,index) in roles" :key="index" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </panel>
  </div>
</template>
<script>
  import Panel from 'components/admin/common/panel/Panel'
  import {check_user} from 'network/admin/users'
  import {get_role} from 'network/admin/roles'
  import {create_admin} from 'network/admin/admins'
  export default {
    name:'AdminsCreate',
    data() {
      return {
        adminInfo:{
          email:'',
          nickname:'',
          password:'',
          confirm:'',
          role:''
        },
        rules:{
          email:[
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
            { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请填写正确的邮箱地址', trigger: 'blur' },
            {
              validator:(rule,value,callback)=>{
                check_user({email:value}).then(res=>{
                  res.data=="" ? callback() : callback(new Error('邮箱被占用！'))
                }).catch(err=>{
                  this.$message.error(err.message)
                })
              },
              trigger:'blur'
            }
          ],
          nickname:[
            { required: true, message: '请输入用户昵称', trigger: 'blur' },
            {
              validator:(rule,value,callback)=>{
                check_user({nickname:value}).then(res=>{
                  res.data=="" ? callback() : callback(new Error('昵称被占用！'))
                }).catch(err=>{
                  this.$message.error(err.message)
                })
              },
              trigger:'blur'
            }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码不得小于6位', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (this.adminInfo.confirm !== '') {
                  this.$refs.adminInfoForm.validateField('confirm');
                }
                callback();
              }, 
              trigger: 'blur'
            }
          ],
          confirm:[
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                if (value !== this.adminInfo.password) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              }, 
              trigger: 'blur'
            }
          ],
          role:[
            {required: true, message: '请为管理员分配角色', trigger:  ["blur",'change']}
          ]
        },
        roles:[],
        rolesError:false
      }
    },
    created() {
      this.getRoles()
    },
    methods: {
      getRoles(){
        get_role().then(res=>{
          this.roles=res.data.filter(item=>item.authorities.indexOf(100000)==-1)
        }).catch(err=>{
          this.rolesError=true
          this.$message.error(err.message)
        })
      },
      add(){
        this.$refs.adminInfoForm.validate(res=>{
          if(res){
            delete this.adminInfo.confirm
            create_admin(this.adminInfo).then(res=>{
              this.$message.success('新增管理员成功')
              this.$router.push({name:'admin-list'})
            }).catch(err=>{
              this.$message.error(err.message)
            })
          }
        })
      }
    },
    components:{Panel}
  }
</script>

<style>

</style>