<template>
  <div id="nav-menu">
    <div class="login-info">
      <span>
        <a href="javascript:void(0);">
          <img src="~assets/admin/images/sunny.png" alt="me" class="online"> 
          <span>{{nickname}} {{rolename}} </span>
        </a>	
      </span>
    </div>

    <el-menu :default-active="$route.path" background-color="transparent" text-color="#fff" active-text-color="#ffd04b" :router="true" unique-opened>
      <el-menu-item index="/">
        <i class="el-icon-house"></i>
        <span slot="title">控制面板</span>
      </el-menu-item>
      <el-submenu index="2" v-if="auths.content_cat.read||auths.content_ls.read">
        <template slot="title"><i class="el-icon-edit"></i><span>内容管理</span></template>
        <el-menu-item index="/contentcat" v-if="auths.content_cat.read" class="bl">内容分类</el-menu-item>
        <el-menu-item index="/content" v-if="auths.content_ls.read" class="bl">内容管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3" v-if="auths.goods_cat.read||auths.goods_ls.read">
        <template slot="title"><i class="el-icon-shopping-cart-full"></i><span>商品管理</span></template>
        <el-menu-item index="/goodscat" v-if="auths.goods_cat.read" class="bl">商品分类</el-menu-item>
        <el-menu-item index="/goods" v-if="auths.goods_ls.read" class="bl">商品管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/order" v-if="auths.order.read">
        <i class="el-icon-goods"></i><span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/users" v-if="auths.users.read">
        <i class="el-icon-user"></i><span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="6" v-if="auths.roles.read||auths.adminUsers.read||auths.account.read">
        <template slot="title"><i class="el-icon-setting"></i><span>系统设置</span></template>
        <el-menu-item index="/roles" v-if="auths.roles.read" class="bl">权限角色</el-menu-item>
        <el-menu-item index="/admins" v-if="auths.adminUsers.read" class="bl">后台用户</el-menu-item>
        <el-menu-item index="/account" v-if="auths.account.read" class="bl">我的账号</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import _ from "lodash"
  export default {
    name:'LayoutNavMenu',
    computed: {
      nickname(){
        return this.$store.state.nickname
      },
      rolename(){
        return this.$store.state.rolename
      },
      auths(){
        return this.$store.getters.getAuths
      }
    }
  }
</script>

<style>
  .login-info, .login-info * {
    box-sizing: content-box;
  }
  .login-info {
    display: block;
    width: 100%;
    height: 39px;
    margin: 0!important;
    color: #fff;
    border: solid transparent;
    border-width: 1px 0;
    border-bottom: 1px solid #525151;
    box-shadow: inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07);
  }
  .login-info>span {
    display: block;
    height: 38px;
    padding: 0 10px;
    border-bottom: 1px solid #1A1817;
  }
  .login-info>span a {
    display: inline-block;
    margin-top: 6px;
    text-decoration: none!important;
    color: #c0bbb7;
  }
  .login-info>span a img {
    display: inline-block;
    width: 25px;
    height: auto;
    margin-top: 1px;
    margin-right: 5px;
    margin-left: 0;
    vertical-align: middle;
    border-left: 3px solid #fff;
  }
  img.online {
    border-left-color: #40ac2b!important;
  }  

  .el-menu{
    border: none;
  }
  .el-menu-item{
    background-color: transparent!important;
  }
  .el-menu-item, 
  .el-submenu__title{
    height: 42px!important;
    line-height: 42px!important;
  }
  .el-menu-item, .el-submenu__title{
    padding:0 10px!important;
  }
  .el-menu-item [class^=el-icon-],
  .el-submenu [class^=el-icon-]{
    text-align: left;
    margin-right: 0;
  }
  .el-menu-item:hover,
  .el-submenu__title:focus, 
  .el-submenu__title:hover{
    background-color: rgba(0, 0, 0, .2)!important;
  }
  .el-submenu .el-menu-item{
    min-width: auto;
  }
  .el-menu-item.bl{
    margin-left:34px;border-left:1px solid #aaa;
  }
</style>