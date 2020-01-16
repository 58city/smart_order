import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'common/storage'

Vue.use(Vuex)

const store=new Vuex.Store({
  state: {
    userid:storage.get('userid',''),
    email:storage.get('email',''),
    nickname:storage.get('nickname',''),
    rolename:storage.get('rolename',''),
    authorities:storage.getObject('authorities',[]), 
    auths:{
      roles: { read: false, edit: false },
      adminUsers: { read: false, edit: false },
      account: { read: false, edit: false },
      content_cat: { read: false, edit: false },
      content_ls: { read: false, edit: false },
      goods_cat: { read: false, edit: false },
      goods_ls: { read: false, edit: false },
      order: { read: false, edit: false },
      users: { read: false, edit: false },
    }
  },
  mutations: {
    handleCurrentUserInfo(state, user){
      state.userid=user._id
      state.email=user.email
      state.nickname=user.nickname
      state.rolename=user.role.name
      state.authorities=user.role.authorities
      // 把登录的用户保存到localStorage中
      // 防止页面刷新，导致vuex重新启动，用户就成为初始值（初始值为空）的情况
      storage.set('userid', user._id)
      storage.set('email', user.email)
      storage.set('nickname', user.nickname)
      storage.set('rolename', user.role.name)
      storage.setObject('authorities', user.role.authorities)
    },
    setEmail(state,email){
      state.email=email
      storage.set('email', email)
    },
    setNickname(state,nickname){
      state.nickname=nickname
      storage.set('nickname', nickname)
    }
  },
  getters:{
    getAuths(state){
      state.authorities.forEach(auth_code => {
        if(auth_code === 100000){
          Object.keys(state.auths).forEach(function (key) {
            state.auths[key] = { read: true, edit: true };
          })
          return false;
        }
        switch (auth_code) {
          case 100100: state.auths.roles.read  = true; break;
          case 100101: state.auths.roles.edit  = true; break;
          case 100200: state.auths.adminUsers.read  = true; break;
          case 100201: state.auths.adminUsers.edit  = true;
          case 100300: state.auths.account.read  = true; break;
          case 100301: state.auths.account.edit  = true; break;
          case 100400: state.auths.content_cat.read  = true; break;
          case 100401: state.auths.content_cat.edit  = true; break;
          case 100500: state.auths.content_ls.read  = true; break;
          case 100501: state.auths.content_ls.edit  = true; break;
          case 100600: state.auths.goods_cat.read  = true; break;
          case 100601: state.auths.goods_cat.edit  = true; break;
          case 100700: state.auths.goods_ls.read  = true; break;
          case 100701: state.auths.goods_ls.edit  = true; break;
          case 100800: state.auths.order.read  = true; break;
          case 100801: state.auths.order.edit  = true; break;
          case 100900: state.auths.users.read  = true; break;
          case 100901: state.auths.users.edit  = true; break;
        }
      })
      return state.auths
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
