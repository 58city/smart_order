import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=>import('views/mobile/home/Home')
const Category = ()=>import('views/mobile/category/Category')
const Cart = ()=>import('views/mobile/cart/Cart')
const Profile = ()=>import('views/mobile/profile/Profile')
const Detail = ()=>import('views/mobile/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path:'',redirect:'/home'
  },
  {
    path:'/home',component:Home
  },
  {
    path:'/category',component:Category
  },
  {
    path:'/cart',component:Cart
  },
  {
    path:'/profile',component:Profile
  },
  {
    path:'/detail/:id',name:'detail',component:Detail
  }
]

// let basePath = "/";
// if (process.env.NODE_ENV == 'development') {
//   basePath = basePath + 'mobile';
// }
const router = new VueRouter({
  mode: 'history',
  base: '/mobile',
  routes
})

export default router
