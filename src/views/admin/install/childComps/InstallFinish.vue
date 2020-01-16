<template>
  <div id="installFinish">
    <el-button type="success" @click="openAdmin">登录管理后台</el-button>
  </div>
</template>

<script>
export default {
  name:'InstallFinish',
  methods: {
    openAdmin(){
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
  #installFinish{
    background-color: var(--color-background-grey);
    border: 1px solid var(--color-border);
    border-radius: 2px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
    padding: 20px;
    height: 300px;
    line-height: 300px;
    overflow-y: scroll;
    text-align: center;
  }
</style>