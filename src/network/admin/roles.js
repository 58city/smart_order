import {request} from './request'
export function get_role(options={}){
  let url='/api/roles';
  if(options.id){
    url='/api/roles/'+options.id
  }
  return request({
    url:url,
    method:'get',
    params:{search:options.search}
  })
}
export function create_role(data){
  return request({
    url:'/api/roles',
    method:'post',
    data:data
  })
}
export function update_role(id,data){
  return request({
    url:'/api/roles/'+id,
    method:'put',
    data:data
  })
}
export function delete_role(options={}){
  let url='/api/roles';
  if(options.id){
    url='/api/roles/'+options.id
  }
  return request({
    url:url,
    method:'delete',
    params:{_ids:options._ids}
  })
}
export function get_auth_list(){
  return request({
    url:'/api/authorities',
    method:'get'
  })
}