import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL:'/',
    timeout:3000
  })
  // 设置请求头
  // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })
  // 响应拦截器
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    return Promise.reject(err)
  })
  return instance(config)
}