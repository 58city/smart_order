import {request} from './request'
export function get_goodsattr(opts={}){
  let query={}
  if(opts.name) query.name=opts.name;
  if(opts.cid) query.cid=opts.cid;
  if(opts.type) query.type=opts.type;
  if(opts.pageSize) query.pageSize=opts.pageSize;
  if(opts.currentPage) query.currentPage=opts.currentPage;
  return request({
    url:'/api/goodsattr'+(opts.id ? '/' + opts.id : ''),
    method:'get',
    params:query
  })
}
export function create_goodsattr(data={}){
  return request({
    url:'/api/goodsattr',
    method:'post',
    data:data
  })
}
export function delete_goodsattr(opts={}){
  let url='/api/goodsattr'
  let query={}
  if(opts.id) url+='/'+opts.id
  if(opts.ids) query._ids=opts.ids
  return request({
    url:url,
    method:'delete',
    params:query
  })
}
export function update_goodsattr(id,opts={}){
  let data={}
  if (opts.name) data.name = opts.name
  if (opts.cid) data.cid = opts.cid
  if (opts.type) data.type = opts.type
  if (opts.attrs) data.attrs = opts.attrs
  return request({
    url:'/api/goodsattr/'+id,
    method:'put',
    data:data
  })
}