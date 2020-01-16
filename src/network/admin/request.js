import axios from 'axios'
import { Loading } from 'element-ui'
import router from '../../router/admin'

export function request(config){

  const instance = axios.create({
    baseURL:' http://localhost:3000',
    timeout:6000
  })

  // 设置请求头
  // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  // 开启发送cookies功能
  instance.defaults.withCredentials = true

  // 请求拦截器
  let loadinginstace=null
  instance.interceptors.request.use(config => {
    loadinginstace = Loading.service({
      lock: true,
      text: '拼命加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.6)',
      fullscreen: true 
    })
    return config
  }, err => {
    loadinginstace.close()
    return Promise.reject(err)
  })
  // 响应拦截器
  instance.interceptors.response.use(res => {
    loadinginstace.close()
    return res
  }, err => {
    loadinginstace.close()
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
        break
        case 401:
          if (err.response.data && err.response.data.error) {
            switch (err.response.data.error.code) {
              // 没有登录
              case 'NOT_LOGGED_IN':
                err.message = '未授权，请登录'
                router.replace({ path: '/login' })
              break;
              // 没有权限
              case 'NO_AUTHORITY':
                err.message = '无权限，请联系管理员'
                router.replace({ path: '/' })
              break;
              // 用户名或密码错误
              case 'WRONG_EMAIL_OR_PASSWORD':
                err.message = '用户名或密码错误'
              break;
            }
          }
        break
        case 403:
          err.message = '拒绝访问'
        break
        case 404:
          if (err.response.data && err.response.data.error && err.response.data.error.code === 'USER_NOT_FOUND') {
            err.message = '找不到用户或用户不存在'
            router.replace({ path: '/login' })
          }
        break
        case 408:
          // 预检请求超时，则response对象为undefined
          // 因为正式请求还未发出，也就没有返回了,也不会走到这里
          // 但是axios会向外部暴露一个timeout of 1000ms exceeded错误
          err.message = '请求超时'
        break
        case 500:
          console.dir(err)
          err.message = '服务器内部错误'
        break
        case 501:
          err.message = '服务未实现'
        break
        case 502:
          err.message = '网关错误'
        break
        case 503:
          err.message = '服务不可用'
        break
        case 504:
          err.message = '网关超时'
        break
        case 505:
          err.message = 'HTTP版本不受支持'
        break
      }
    }
    return Promise.reject(err)
  })

  return instance(config)
}