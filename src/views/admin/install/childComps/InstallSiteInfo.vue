<template>
  <div id="siteInfo">
    <el-form ref="siteInfoForm" :model="siteInfo" :rules="rules" label-width="92px">
      <el-form-item label="Email：" prop="email">
        <el-input v-model="siteInfo.email" type="text" @blur="formBlur"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-input v-model="siteInfo.nickname" type="text" @blur="formBlur"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="siteInfo.password" type="password" @blur="formBlur"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirm">
        <el-input v-model="siteInfo.confirm" type="password" @blur="formBlur"></el-input>
      </el-form-item>
      <el-alert title="安装请求失败，请尝试重启服务器与数据库并重新安装" type="error" effect="dark" v-show="showError" :closable="false"></el-alert>
    </el-form>
  </div>
</template>
<script>
export default {
  name:'InstallSiteInfo',
  data() {
    return {
      siteInfo:{
        email:'',
        nickname:'',
        password:'',
        confirm:''
      },
      rules:{
        email:[
          { required: true, message: '电子邮箱为必填项', trigger: 'blur' },
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请填写正确的邮箱地址', trigger: 'blur' }
        ],
        nickname:[
          { required: true, message: '昵称为必填项', trigger: 'blur' }
        ],
        password:[
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              }else if(value.length<6){
                callback(new Error('密码不得小于6位'));
              } else {
                if (this.siteInfo.confirm !== '') {
                  this.$refs.siteInfoForm.validateField('confirm');
                }
                callback();
              }
            }, 
            trigger: 'blur'
          }
        ],
        confirm:[
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.siteInfo.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }, 
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    formBlur(){
      this.$refs.siteInfoForm.validate(res=>{
        this.$emit('formBlur',res)
        this.$refs.siteInfoForm.clearValidate()
      })
    }
  },
  props:{
    showError:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
  #siteInfo{
    background-color: var(--color-background-grey);
    border: 1px solid var(--color-border);
    border-radius: 2px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    padding: 20px;
    max-height: 300px;min-height: 20px;
    overflow-y: scroll;
  }
  .el-form{
    width: 90%;
    margin: 0 auto;
  }
  .el-select{
    width: 100%;
  }
</style>