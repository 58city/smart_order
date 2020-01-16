import {request} from './request'
export function hasInstall(){
  return request({
    url:'/api/install',
    method:'get'
  })
}
export function testDatabase(data){
  return request({
    url:'/api/install/test-database',
    method:'put',
    data:data
  })
}
export function loadThemes(data){
  return request({
    url:'/api/install/themes',
    method:'get'
  })
}
export function install(data){
  return request({
    url:'/api/install',
    method:'post',
    data:data
  })
}