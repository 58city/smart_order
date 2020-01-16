<template>
  <div id="header">
    <div class="logo-group left">
      <span class="logo"> <img src="~assets/admin/images/logo.png" alt="edacms"></span>
    </div>
    <div class="btn-group right">
      <div class="fullscreen btn-header transparent">
        <span> 
          <a href="javascript:void(0);" title="全屏" @click="fullscreen">
            <i class="fa fa-arrows-alt"></i>
          </a> 
        </span>
      </div>
      <div class="header-search" :class="{'show-mobile-search':showMobileSearch}">
        <input type="text" name="param" placeholder="输入查找内容">
        <button type="button">
          <i class="fa fa-search"></i>
        </button>
        <a href="javascript:void(0);" title="取消搜索" @click="hide_search_m">
          <i class="fa fa-times"></i>
        </a>
      </div>
      <div class="search-mobile btn-header transparent" @click="show_search_m">
        <span> 
          <a href="javascript:void(0)" title="搜索">
            <i class="fa fa-search"></i>
          </a> 
        </span>
      </div>
      <div class="logout btn-header transparent">
        <span> 
          <a href="javascript:void(0);" title="退出" @click="logout">
            <i class="fa fa-sign-out"></i>
          </a> 
        </span>
      </div>
      <div class="hide-menu btn-header" :class="{'hide':isHide}" @click="toggleMenu">
        <span> 
          <a href="javascript:void(0);" title="折叠菜单" >
            <i class="fa fa-reorder"></i>
          </a> 
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'LayoutHeader',
    data() {
      return {
        isFullScreen:false,
        isHide:false,
        showMobileSearch:false
      }
    },
    methods: {
      fullscreen(){
        if (this.isFullScreen=!this.isFullScreen) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
      },
      show_search_m(){
        this.showMobileSearch=true
      },
      hide_search_m(){
        this.showMobileSearch=false
      },
      logout(){
        this.$confirm(this.nickname+':此操作将退出管理后台, 是否继续?', '退出登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('logout')
        }).catch(()=>{

        })
      },
      toggleMenu(){
        this.isHide=!this.isHide
        this.$emit('toggleMenu',this.isHide)
      }
    },
    computed: {
      nickname(){
        return this.$store.state.nickname
      }
    }
  }
</script>

<style scoped>
  #header{
    line-height: var(--line-height);
  }
  #header>div {
    height: 49px;
  }
  /* 
   ******************* logo *******************
   */
  .logo-group * {
    box-sizing: content-box;
  }
  .logo-group .logo {
    display: inline-block;
    width: 175px;
    margin-top: 13px;
  }
  .logo-group .logo img {
    width: 110px;
    height: auto;
  }
  /* 
   ******************* 按钮组 *******************
   */
  .btn-group{
    display:flex;
    align-items: center;
  }
  .btn-group>div{
    margin-left: 6px;
  }
  /* 按钮公共样式 */
  .btn-header span a{
    display: inline-block;
    min-width: 30px;
    padding: 2px;
    font-size: 16px;
    text-align: center;
    color: #6D6A69;
    border: 1px solid #bfbfbf;
    border-radius: 2px;
    background-color: #f8f8f8;
    background-image: linear-gradient(top,#f8f8f8,#f1f1f1);
    -moz-user-select: none;
    -webkit-user-select: none;
    cursor: default!important;
  }
  .btn-header>span>a:hover{
    border:1px solid #bfbfbf;color:#222;
    transition:all 0s;cursor:pointer;
    box-shadow:inset 0 0 4px 1px rgba(0,0,0,.08);
  }
  .btn-header>span>a:active{
    background-color:#e8e8e8;
    background-image:linear-gradient(to bottom,#e8e8e8 0,#ededed 100%);
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#e8e8e8', endColorstr='#ededed', GradientType=0);
    box-shadow:inset 0 0 3px 1px rgba(0,0,0,.15);
  }
  /* 全屏按钮全屏样式 */
  :-webkit-full-screen .fullscreen>span>a{
      background-color:#e8e8e8;
      background-image:linear-gradient(to bottom,#5a5a5a 0,#686868 100%);
      filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5A5A5A', endColorstr='#686868', GradientType=0);
      box-shadow:inset 0 0 3px 1px rgba(0,0,0,.15);
      color:#fff;
      border-color:#494949;
  }
  :-moz-full-screen .fullscreen>span>a{
      background-color:#e8e8e8;
      background-image:linear-gradient(to bottom,#5a5a5a 0,#686868 100%);
      filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5A5A5A', endColorstr='#686868', GradientType=0);
      box-shadow:inset 0 0 3px 1px rgba(0,0,0,.15);
      color:#fff;
      border-color:#494949;
  }
  :-ms-fullscreen .fullscreen>span>a{
      background-color:#e8e8e8;
      background-image:linear-gradient(to bottom,#5a5a5a 0,#686868 100%);
      filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5A5A5A', endColorstr='#686868', GradientType=0);
      box-shadow:inset 0 0 3px 1px rgba(0,0,0,.15);
      color:#fff;
      border-color:#494949;
  }
  :full-screen .fullscreen>span>a{
      background-color:#e8e8e8;
      background-image:linear-gradient(to bottom,#5a5a5a 0,#686868 100%);
      filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5A5A5A', endColorstr='#686868', GradientType=0);
      box-shadow:inset 0 0 3px 1px rgba(0,0,0,.15);
      color:#fff;
      border-color:#494949;
  }
  :-webkit-full-screen .fullscreen>span>a{
      background-color:#e8e8e8;
      background-image:linear-gradient(to bottom,#5a5a5a 0,#686868 100%);
      filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5A5A5A', endColorstr='#686868', GradientType=0);
      box-shadow:inset 0 0 3px 1px rgba(0,0,0,.15);
      color:#fff;
      border-color:#494949;
  }
  :-ms-fullscreen .fullscreen>span>a{
      background-color:#e8e8e8;
      background-image:linear-gradient(to bottom,#5a5a5a 0,#686868 100%);
      filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5A5A5A', endColorstr='#686868', GradientType=0);
      box-shadow:inset 0 0 3px 1px rgba(0,0,0,.15);
      color:#fff;
      border-color:#494949;
  }
  :fullscreen .fullscreen>span>a{
      background-color:#e8e8e8;
      background-image:linear-gradient(to bottom,#5a5a5a 0,#686868 100%);
      filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5A5A5A', endColorstr='#686868', GradientType=0);
      box-shadow:inset 0 0 3px 1px rgba(0,0,0,.15);
      color:#fff;
      border-color:#494949;
  }
  :-webkit-full-screen video{
      width:100%;height:100%;
  }
  /* 折叠按钮按下样式 */
  .hide-menu.hide>span>a {
    background-color: #e8e8e8;
    background-image: linear-gradient(to bottom,#5a5a5a 0,#686868 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#5A5A5A', endColorstr='#686868', GradientType=0);
    box-shadow: inset 0 0 3px 1px rgba(0,0,0,.15);
    color: #fff;
    border-color: #494949;
  }
  /* 搜索框 */
  .search-mobile {
    display: none;
  }
  .header-search{
    position: relative;
  }
  .header-search>input[type=text] {
    display: block;
    width: 100%;
    height: 30px;
    min-width: 200px;
    padding: 0 10px;
    border: 1px solid #bfbfbf;
    background: #fff;
    color: #404040;
  }
  .header-search>button {
    background-color: #fff;
    border: none;
    color: #6D6A69;
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 17px;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 1px;
    top: 1px;
    z-index: 2;
  }
  .header-search>a {
    display: none;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 3;
    width: 30px;
    height: 29px;
    line-height: 29px;
    padding: 0;
    font-size: 17px;
    text-align: center;
    text-decoration: none!important;
    background: #a90329;
    color: #fff;
  }
  .header-search.show-mobile-search {
    display: block;
    width: 100%;
    height: 49px;
    padding: 0 2px;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    background: #333;
  }
  .header-search.show-mobile-search>input[type=text] {
    padding-right: 75px;
    margin-top: 2px;
    height: 45px;
    border-color: #333;
  }
  .header-search.show-mobile-search>button {
    right: 44px;
    top: 10px;
    height: 29px;
    line-height: 29px;
    background: #DDD;
  }
  .header-search.show-mobile-search>a {
    display: block;
  }
  /* 
   ******************* 自适应 *******************
   */
  @media (max-width:979px){
    .btn-header a{width:40px!important;}
  }
  @media (max-width:767px){
    .btn-header.transparent a{
        border:none!important;
        background:0 0;
        margin-left:0;
        width:25px!important;
        box-shadow:none!important;
    }
    .btn-header.transparent a:hover{
        color:#a90329;
    }
    .fullscreen {
      display: none!important;
    }
    .search-mobile {
      display: block;
    }
    .header-search {
      display: none;
    }
  }
</style>