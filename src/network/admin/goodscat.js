import {request} from './request'
export function get_goodscat(opts={}){
  let query={}
  if(opts.type) query.type=opts.type;
  if(opts.pageSize) query.pageSize=opts.pageSize;
  if(opts.currentPage) query.currentPage=opts.currentPage;
  if(typeof opts.deleted == 'boolean') query.deleted=opts.deleted;
  return request({
    url:'/api/goodscat'+(opts.id ? '/' + opts.id : ''),
    method:'get',
    params:query
  })
}
export function create_goodscat(data={}){
  return request({
    url:'/api/goodscat',
    method:'post',
    data:data
  })
}
export function delete_goodscat(opts={}){
  let url='/api/goodscat'
  let query={}
  if(opts.id) url+='/'+opts.id;
  if(opts.ids) query._ids=opts.ids;
  return request({
    url:url,
    method:'delete',
    params:query
  })
}
export function update_goodscat(id,data){
  return request({
    url:'/api/goodscat/'+id,
    method:'put',
    data:data
  })
}