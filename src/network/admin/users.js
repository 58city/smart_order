import {request} from './request'
export function check_user(opts){
  var query={ }
  if(opts.email){
    query.email=opts.email
  }
  if(opts.nickname){
    query.nickname=opts.nickname
  }
  return request({
    url:'api/users',
    method:'get',
    params:query
  })
}