import Mock from 'mockjs'
import url from 'url'
/*
 * 首页多种数据
 */
Mock.mock('/home/multidata', 'get', opts=>{
  // {url: "/home/multidata", type: "GET", body: null}
  // console.log(opts);
  // Mock.Random 中的方法与数据模板的 @占位符 一一对应
  return {
    msg:'SUCCESS',success:true,
    homeData:Mock.mock({
      'banner|4':[{
        'id|+1':1,
        'title':'@ctitle(8,20)',
        'image':'@image("750x390")',
        'link':'@url',
        'width':750,
        'height':390
      }],
      'recommend|4':[{
        'id|+1':1,
        'title':'@ctitle(4)',
        'image':'@image("200x200")',
        'link':'@url',
        'width':200,
        'height':200
      }]
    })
  }
})

/*
 * 首页商品数据
 */
const goods_temp_arr=[]
for(let i = 0; i < 500; i ++) {
  let template = {
    'id':Mock.Random.id(),
    'title':'@ctitle(8,20)',
    'image':'@image("400x400")',
    'type|1':['popu','news','sell'],
    'price':'@integer(1,1000)',
    'discountPrice':function(){
      return this.price*0.8
    },
    'collect':'@integer(0,10000)',
    'isAddedCart':'@boolean',
    'cartNum':'@integer(1,10)',
    'desc|1':['新款上市~','精品推荐~','今日特价'],
    'discountDesc':['活动价','优惠价','折扣价'],
    'discountBgColor':'#f13e3a',
    'topImgs|5':['@image("750x390")']
  }
  goods_temp_arr.push(template)
}
const goods=Mock.mock(goods_temp_arr)
// 首页商品列表
Mock.mock(new RegExp('/home/data'), 'get', opts=>{
  let pageSize=8
  let {type,page}=url.parse(opts.url,true).query
  let start=(page-1)*pageSize
  let end=start+pageSize
  return {
    msg:'SUCCESS',success:true,
    homeGoods:goods.filter(item=>{return item.type==type}).slice(start,end)
  }
})
// 详情页获取单个商品信息
Mock.mock(new RegExp('/detail'),'get',opts=>{
  let {id}=url.parse(opts.url,true).query
  let itemInfo=goods.filter(item=>item.id==id)[0]
  return {
    status:{
      code:1001,
      msg:'数据请求成功'
    },
    result:{
      itemInfo:itemInfo,
      columns:['销量 1580','收藏3人','默认快递'],
      shopInfo:{
        services:[
          {'icon':'',name:'退货补运费'},
          {'icon':'',name:'全国包邮'},
          {'icon':'',name:'7天无理由退换货'}
        ]
      }
    }
  }
})