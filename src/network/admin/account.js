import {request} from './request'
export function signIn(data){
  return request({
    url:'/api/account/sign-in',
    method:'put',
    data:data
  })
}
export function signOut(){
  return request({
    url:'/api/account/sign-out',
    method:'put'
  })
}
export function get_account(){
  return request({
    url:'/api/account',
    method:'get'
  })
}
export function update_account(data){
  return request({
    url:'/api/account',
    method:'put',
    data:data
  })
}
