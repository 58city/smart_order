<template>
  <div id="login">
    <img src="~assets/admin/images/logo-lg.png" alt="">
    <el-card :class="{animated:animateShake,shake:animateShake,fast:animateShake}">
      <div slot="header" class="card-header">
        <span>欢迎回来</span>
      </div>
      <div class="card-body">
        <el-form ref="loginForm" :model="loginInfo" :rules="rules">
          <el-form-item prop="email">
            <el-input v-model="loginInfo.email" type="text">
              <template slot="prepend"><i class="el-icon-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginInfo.password" type="password">
              <template slot="prepend"><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-checkbox v-model="loginInfo.autoSignIn">自动登录</el-checkbox>
          <el-button type="primary" @click="onSubmit" :disabled="disabled">登录</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {signIn,get_account} from 'network/admin/account'
export default {
  name:'Login',
  data() {
    return {
      loginInfo:{
        email:'',
        password:'',
        autoSignIn:false
      },
      rules:{
        email:[
          { required: true, message: '电子邮箱为必填项', trigger: 'change' },
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请填写正确的邮箱地址', trigger: 'change' } 
        ],
        password:[
          { required: true, message: '密码为必填项', trigger: 'change' },
          { min: 6, message: '密码不得小于6位', trigger: 'change'}
        ]
      },
      animateShake:false,
      disabled:false
    }
  },
  methods: {
    onSubmit(){
      this.disabled=true
      this.$refs.loginForm.validate(res=>{
        if(res){
          signIn(this.loginInfo).then(res=>{
            get_account().then(res=>{
              this.$store.commit('handleCurrentUserInfo',res.data)
            })
            this.$router.replace('/')
          }).catch(err=>{
            this.$message.error(err.message)
            this.animateShake=true
            setTimeout(()=> {
              this.disabled=false
              this.animateShake = false
            }, 600)
          })
        }else{
          this.animateShake = true;
          setTimeout(()=> {
            this.disabled=false
            this.animateShake = false;
          }, 600)
        }
      })
    }
  }
}
</script>

<style scoped>
  #login{
    background: #2d353c;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
  }
  .el-card{
    width: 480px;
    margin-top: 20px;
  }
  .el-button{
    display:block;
    width:100%;
    margin-top: 10px;
  }
  .el-alert{
    margin-bottom: 10px;
  }
</style>