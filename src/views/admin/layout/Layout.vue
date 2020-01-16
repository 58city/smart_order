<template>
  <el-container>

    <el-header height="49px" class="top">
      <layout-header @logout="logout" @toggleMenu="toggleMenu"></layout-header>
    </el-header>
    
    <el-container :class="{folded:folded}">

      <el-aside width="200px">
        <layout-nav-menu></layout-nav-menu>
      </el-aside>

      <el-container>
        <el-header height="40px" class="main">
          <layout-breadcrumb></layout-breadcrumb>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer height="52px">©2017-2019 EDA All rights reserved.</el-footer>
      </el-container>

    </el-container>
    
  </el-container>
</template>

<script>
import LayoutHeader from './childComps/LayoutHeader'
import LayoutNavMenu from './childComps/LayoutNavMenu'
import LayoutBreadcrumb from './childComps/LayoutBreadcrumb'
import {signOut} from 'network/admin/account'
export default {
  name:'Layout',
  data() {
    return {
      folded:false
    }
  },
  methods: {
    logout(){
      signOut().then(res=>{
        this.$cookies.remove('edacmsSid')
        this.$localStorage.remove('userid')
        this.$localStorage.remove('email')
        this.$localStorage.remove('nickname')
        this.$localStorage.remove('rolename')
        this.$localStorage.remove('authorities')
        this.$router.replace('/login')
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    toggleMenu(){
      this.folded=!this.folded
    }
  },
  components:{
    LayoutHeader,LayoutNavMenu,LayoutBreadcrumb
  }
}
</script>

<style scoped>
  .el-container:first-child{
    height: 100vh;
  }
  .el-header{
    padding:0 10px;
  }
  .el-header.top{
    background-color: #f3f3f3;
    background-image: linear-gradient(to bottom,#f3f3f3,#e2e2e2);
  }
  .el-header.main{
    background: #3a3633;
  }
  .el-footer{
    border-top: 1px solid #CECECE;
    background: #3a3633;
    color: #fff;
    text-align: center;
    line-height: 52px;
  }
  .el-aside {
    background: #3a3633;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJod…BoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);
    background: linear-gradient(to right,#3a3633 93%,#2a2725 100%);
  }
  .el-aside,.el-container{
    transition: 0.2s;
  }
  .folded .el-aside{
    transform: translateX(-190px);
  }
  .folded .el-container{
    margin-left: -190px;
  }
</style>