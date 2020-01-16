/*
 * ① 开发环境，使用多页面模式
 * 多页面模式使用history默认URL地址不会区分每个页面，会以publicPath作为基础路径
 * 需要我们去配置每个页面路由表的vueRouter的base属性
 * ② 生产环境，分别打包到根目录的view文件夹
 * npm run build mobile
 * npm run build backend
 */ 
let objectProject = {
  backend:{
    entry:'src/views/admin/main.js',
    template:'src/views/admin/index.html',
    filename:'admin.html',
    title:'后台管理系统'
  },
  mobile:{
    entry:'src/views/mobile/main.js',
    template:'src/views/mobile/index.html',
    filename:'mobile.html',
    title:'移动端'
  }
}
let page = {}
let projectname = process.argv[3] || ''
if (process.env.NODE_ENV == 'development') {
  page = objectProject
} else {
  page[projectname] = objectProject[projectname]
}
module.exports={
  publicPath: '/'+projectname,
  outputDir: './view/'+projectname,
  pages:page,
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    },
    /*
     * 开发时，为了方便调试我们需要开启两个服务器
     * 一是：项目服务器，上面是后台服务器程序，包括服务器环境配置、接口、日志等
     * 二是：开发服务器，上面是监视文件变化自动打包到内存，和热更新程序
     * 所以在开发时，请求接口数据时我们会遇到跨域的问题，经过如下代理服务器配置后
     * 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
     * 
     * 假如不使用代理服务器，如何进行跨域数据的请求呢？
     * 第一步：配置axios的baseURL为要访问的跨域的域名
     * 第二步：配置axios的axios.defaults.withCredentials = true，开启向目标服务器发送cookie的功能(假如要使用session验证权限)
     * 第三步：配置要跨域访问的服务器入口程序，开启cors(允许来源、同意cookie接收、允许的请求方法)
     * 第四步：在服务器拦截路由检查权限时，过滤掉预检请求options，否则会拦截options请求，导致后续请求进不来，返回错误
     */ 
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       //要访问的跨域的域名
    //       target: 'http://localhost:3000/',
    //       //是否启用websockets
    //       ws: true, 
    //       //开启代理：
    //       changOrigin: true
    //     }
    //   }
    // }
  }
}