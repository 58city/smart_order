import {request} from './request'
export function get_admins(opts={}){
  let query={}
  if(opts.search){
    query.search=opts.search
  }
  let url='/api/admins'
  if(opts.id){
    url+='/'+opts.id
  }
  return request({
    url:url,
    method:'get',
    params:query
  })
}
export function create_admin(data){
  return request({
    url:'/api/admins',
    method:'post',
    data:data
  })
}
export function update_admin(id,data){
  return request({
    url:'/api/admins/'+id,
    method:'put',
    data:data
  })
}
export function delete_admin(opts){
  let url='/api/admins'
  let query={}
  if(opts.id){
    url+='/'+opts.id
  }
  if(opts.ids){
    query._ids=opts.ids
  }
  return request({
    url:url,
    method:'delete',
    params:query
  })
}