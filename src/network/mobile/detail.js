import {request} from './request'

export function getDetail(id){
  return request({
    url:'/detail',
    params:{id}
  })
}

export class goodsInfo{
  constructor(itemInfo,columns,services){
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.discountPrice
    this.oldPrice=itemInfo.price
    this.discount=itemInfo.discountDesc
    this.columns=columns
    this.services=services
  }
}