<template>
  <div id="install">
    <img src="~assets/admin/images/logo-lg.png" alt="">
    <el-card v-loading="installing">
      <el-steps :active="currentStep">
        <el-step title="步骤 1" description="安装许可协议"></el-step>
        <el-step title="步骤 2" description="MongoDB 数据库配置"></el-step>
        <el-step title="步骤 3" description="初始化网站配置"></el-step>
        <el-step title="步骤 4" description="安装成功"></el-step>
      </el-steps>
      <install-license v-if="currentStep==1"></install-license>
      <install-data-base v-if="currentStep==2" ref="dbInfoForm" @formBlur="getFormStatus" :showError="showError"></install-data-base>
      <install-site-info v-if="currentStep==3" ref="siteInfoForm" @formBlur="getFormStatus" :showError="showError"></install-site-info>
      <install-finish v-if="currentStep==4"></install-finish>
      <el-button type="default" @click="prev" v-if="currentStep>1&&currentStep<4">上一步</el-button>
      <el-button type="primary" @click="agree" v-if="currentStep==1">我已阅读并同意本协议内容</el-button> 
      <el-button type="primary" @click="testDb" v-if="currentStep==2" :disabled="!formValid">连接数据库</el-button>
      <el-button type="primary" @click="install" v-if="currentStep==3" :disabled="!formValid">安装</el-button>
    </el-card>
  </div>
</template>

<script>

  import InstallLicense from './childComps/InstallLicense'
  import InstallDataBase from './childComps/InstallDataBase'
  import InstallSiteInfo from './childComps/InstallSiteInfo'
  import InstallFinish from './childComps/InstallFinish'
  
  import {testDatabase,loadThemes,install} from 'network/admin/install'

  export default {
    name:'Install',
    data() {
      return {
        currentStep:1,
        formValid:false,
        showError:false,
        dbInfo:{},
        installing:false
      }
    },
    methods: {
      getFormStatus(res){
        this.formValid=res
      },
      prev(){
        this.currentStep--
        this.showError=false
      },
      agree(){
        this.currentStep++
      },
      testDb(){
        if(this.formValid){
          testDatabase(this.$refs.dbInfoForm.dbInfo).then(res=>{
            this.showError=false
            this.dbInfo=this.$refs.dbInfoForm.dbInfo
            this.currentStep++
          }).catch(err=>{
            this.showError=true
          })
        }
      },
      install(){
        if(this.formValid){
          let data=Object.assign(this.dbInfo,this.$refs.siteInfoForm.siteInfo)
          delete data.confirm
          this.installing=true
          install(data).then(res=>{
            this.installing=false
            this.showError=false
            this.currentStep++
          }).catch(err=>{
            this.installing=false
            this.showError=true
          })
        }
      }
    },
    components:{
      InstallLicense,InstallDataBase,InstallSiteInfo,InstallFinish
    }
  }
</script>

<style scoped>
  #install{
    background: #2d353c;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
  }
  .el-card{
    width: 80%;
    margin-top: 30px;
  }
  .el-steps{
    margin-bottom: 15px;
  }
  .el-button{
    margin-top: 15px;
  }
</style>