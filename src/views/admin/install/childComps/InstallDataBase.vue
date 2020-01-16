<template>
  <div id="databse">
    <el-form ref="dbform" :model="dbInfo" :rules="rules" label-width="134px">
      <el-form-item label="数据库主机：" prop="host">
        <el-input v-model="dbInfo.host" type="text" @blur="formBlur"></el-input>
        <p>如果数据库与网站位于同一台服务器，默认填写 127.0.0.1 即可</p>
      </el-form-item>
      <el-form-item label="数据库端口：" prop="port">
        <el-input v-model.number="dbInfo.port" type="number" @blur="formBlur"></el-input>
        <p>如果没有修改过MongoDB数据库端口，默认填写 27017 即可</p>
      </el-form-item>
      <el-form-item label="数据库名称：" prop="db">
        <el-input v-model="dbInfo.db" type="text" @blur="formBlur"></el-input>
      </el-form-item>
      <el-form-item label="数据库登录名：" prop="user">
        <el-input v-model="dbInfo.user" type="text" @blur="formBlur"></el-input>
      </el-form-item>
      <el-form-item label="数据库登录密码：" prop="pass">
        <el-input v-model="dbInfo.pass" type="password" @blur="formBlur"></el-input>
      </el-form-item>
      <el-alert title="数据库连接失败，请检查是否填写正确或联系数据库管理员" type="error" effect="dark" v-show="showError" :closable="false"></el-alert>
    </el-form>
  </div>
</template>

<script>
  export default {
    name:'InstallDataBase',
    data() {
      return {
        dbInfo:{
          host:'127.0.0.1',
          port:27017,
          db:'',
          user:'',
          pass:''
        },
        rules:{
          host:[
            { required: true, message: '主机地址必填', trigger: 'blur' },
            { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$|^localhost$/, message: '主机应为为 IP 地址或 localhost', trigger: 'blur' }
          ],
          port:[
            { required: true, message: '端口号必填', trigger: 'blur' },
            { 
              validator: (rule, value, callback) => {
                if (value>65535||value<0) {
                  callback(new Error('端口应为 0 ~ 65535 之间'));
                } else {
                  callback();
                }
              }, 
              trigger: 'blur'
            }
          ],
          db:[
            { required: true, message: '数据库名称必填', trigger: 'blur' }
          ],
          user:[
            { required: true, message: '数据库登录名必填', trigger: 'blur' }
          ],
          pass:[
            { required: true, message: '数据库登录密码必填', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      formBlur(){
        this.$refs.dbform.validate(res=>{
          this.$emit('formBlur',res)
          this.$refs.dbform.clearValidate()
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
  #databse{
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
  .el-form-item p{
    line-height: var(--line-height);
    font-size: var(--font-size-12);
    color: var(--color-text-highlight);
  }
</style>