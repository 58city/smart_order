import Vue from 'vue'
import VueRouter from 'vue-router'
import {hasInstall} from 'network/admin/install'
import Store from '../store/admin'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const Login = ()=>import('views/admin/login/Login')
const Install = ()=>import('views/admin/install/Install')
const Layout = ()=>import('views/admin/layout/Layout')
const Dashboard = ()=>import('views/admin/dashboard/Dashboard')
const Roles = ()=>import('views/admin/roles/Roles')
const RolesList = ()=>import('views/admin/roles/RolesList')
const RolesCreate = ()=>import('views/admin/roles/RolesCreate')
const RolesUpdate = ()=>import('views/admin/roles/RolesUpdate')
const Admins = ()=>import('views/admin/adminUsers/Admins')
const AdminsList = ()=>import('views/admin/adminUsers/AdminsList')
const AdminsCreate = ()=>import('views/admin/adminUsers/AdminsCreate')
const AdminsUpdate = ()=>import('views/admin/adminUsers/AdminsUpdate')
const MyAccount = ()=>import('views/admin/myAccount/MyAccount')

const ContentCat = ()=>import('views/admin/contentCat/ContentCat')
const ContentCatList = ()=>import('views/admin/contentCat/ContentCatList')
const ContentCatCreate = ()=>import('views/admin/contentCat/ContentCatCreate')
const ContentCatUpdate = ()=>import('views/admin/contentCat/ContentCatUpdate')
const Content = ()=>import('views/admin/content/Content')
const ContentList = ()=>import('views/admin/content/ContentList')
const ContentCreate = ()=>import('views/admin/content/ContentCreate')
const ContentUpdate = ()=>import('views/admin/content/ContentUpdate')

const GoodsCat = ()=>import('views/admin/goodsCat/GoodsCat')
const GoodsCatList = ()=>import('views/admin/goodsCat/GoodsCatList')
const GoodsCatCreate = ()=>import('views/admin/goodsCat/GoodsCatCreate')
const GoodsCatUpdate = ()=>import('views/admin/goodsCat/GoodsCatUpdate')
const GoodsAttr = ()=>import('views/admin/goodsAttr/Attribute')
const Goods = ()=>import('views/admin/goods/Goods')
const GoodsList = ()=>import('views/admin/goods/GoodsList')
const GoodsCreate = ()=>import('views/admin/goods/GoodsCreate')
const GoodsUpdate = ()=>import('views/admin/goods/GoodsUpdate')

const Order = ()=>import('views/admin/order/Order')
const OrderList = ()=>import('views/admin/order/OrderList')

const Users = ()=>import('views/admin/users/Users')
const UsersList = ()=>import('views/admin/users/UsersList')
 
const routes = [
  { path:'/install',name:'install',component:Install },
  { path:'/login',name:'login',component:Login },
  {
    path:'/',component:Layout,meta:{title:'首页'},
    children: [
      {
        path: '',name:'dashboard',component: Dashboard,meta:{title:'控制面板'}
      },
      {
        // 当某个路由有子级路由的时候，如果父级路由需要一个默认的路由，此时父级路由不能定义name属性。
        path: 'roles',component: Roles,meta:{title:'权限角色'},
        children:[
          {
            path: '',name:'role-list',component: RolesList,meta:{title:'角色列表',category:'roles',action:'read'}
          },
          {
            path: 'create',name:'role-create',component: RolesCreate,meta:{title:'新增角色',category:'roles',action:'edit'}
          },
          {
            path: 'update/:id',name:'role-update',component: RolesUpdate,meta:{title:'修改角色',category:'roles',action:'edit'}
          }
        ]
      },
      {
        path: 'admins',component: Admins,meta:{title:'后台用户'},
        children:[
          {
            path: '',name:'admin-list',component: AdminsList,meta:{title:'管理员列表',category:'adminUsers',action:'read'}
          },
          {
            path: 'create',name:'admin-create',component: AdminsCreate,meta:{title:'新增管理员',category:'adminUsers',action:'edit'}
          },
          {
            path: 'update/:id',name:'admin-update',component: AdminsUpdate,meta:{title:'修改管理员',category:'adminUsers',action:'edit'}
          }
        ]
      },
      {
        path: 'account',name:'account',component: MyAccount,meta:{title:'我的账号'}
      },
      {
        path: 'contentcat',component: ContentCat,meta:{title:'内容分类'},
        children:[
          {
            path: '',name:'contentcat-list',component: ContentCatList,meta:{title:'分类列表',category:'content_cat',action:'read'}
          },
          {
            path: 'create',name:'contentcat-create',component: ContentCatCreate,meta:{title:'新增分类',category:'content_cat',action:'edit'}
          },
          {
            path: 'update/:id',name:'contentcat-update',component: ContentCatUpdate,meta:{title:'修改分类',category:'content_cat',action:'edit'}
          }
        ]
      },
      {
        path: 'content',component: Content,meta:{title:'内容管理'},
        children:[
          {
            path: '',name:'content-list',component: ContentList,meta:{title:'内容列表',category:'content_ls',action:'read'}
          },
          {
            path: 'create',name:'content-create',component: ContentCreate,meta:{title:'新增内容',category:'content_ls',action:'edit'}
          },
          {
            path: 'update/:id',name:'content-update',component: ContentUpdate,meta:{title:'修改内容',category:'content_ls',action:'edit'}
          }
        ]
      },
      {
        path: 'goodscat',component: GoodsCat,meta:{title:'商品分类'},
        children:[
          {
            path: '',name:'goodscat-list',component:GoodsCatList,meta:{title:'分类列表',category:'goods_cat',action:'read'}
          },
          {
            path: 'create',name:'goodscat-create',component:GoodsCatCreate,meta:{title:'新增分类',category:'goods_cat',action:'edit'}
          },
          {
            path: 'update/:id',name:'goodscat-update',component:GoodsCatUpdate,meta:{title:'修改分类',category:'goods_cat',action:'edit'}
          }
        ]
      },
      {
        path: 'goodsattr',name:'goodsattr',component: GoodsAttr,
        meta:{title:'分类参数',category:'goods_attr',action:'read'}
      },
      {
        path: 'goods',component: Goods,meta:{title:'商品管理'},
        children:[
          {
            path: '',name:'goods-list',component:GoodsList,meta:{title:'商品列表',category:'goods_ls',action:'read'}
          },
          {
            path: 'create',name:'goods-create',component:GoodsCreate,meta:{title:'新增商品',category:'goods_ls',action:'edit'}
          },
          {
            path: 'update/:id',name:'goods-update',component:GoodsUpdate,meta:{title:'修改商品',category:'goods_ls',action:'edit'}
          }
        ]
      },
      {
        path: 'order',component: Order,meta:{title:'订单管理'},
        children:[
          {
            path: '',name:'order-list',component:OrderList,meta:{title:'订单列表',category:'users',action:'read'}
          }
        ]
      },
      {
        path: 'users',component: Users,meta:{title:'用户管理'},
        children:[
          {
            path: '',name:'users-list',component:UsersList,meta:{title:'用户列表',category:'users',action:'read'}
          }
        ]
      }
    ]
  },
  {
    path:'/*',name:'notFound',redirect:'/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/backend',
  routes
})

router.beforeEach((to, from, next) => {
  let cookies=router.app.$cookies.get('edacmsSid')
  // 进入登录路由前，检查是否安装
  if(!cookies&&(to.name=='login'||to.name=='install')){
    hasInstall().then( res=> { 
      if(!res.data.hasInstall){
        next({path: '/install'})
      }else{
        next({path: '/login'})
      }
    })
  }
  // 进入非登录路由前，检查是否存在cookies
  if(!cookies&&to.name!='login'&&to.name!='install'){
    return next({ path: '/login' })
  }
  // 进入路由前，检查是否有进入权限
  let category=to.meta.category
  let action=to.meta.action
  let auths=Store.getters.getAuths
  if(category&&!auths[category][action]){
    return next({ path: to.matched[1].path })
  }
  next()
})

export default router
