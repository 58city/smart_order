var mongoose=require('mongoose');
/*
 * 商品分类模型
 */ 
var goodsCatSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  pid:{
    type:mongoose.Schema.Types.ObjectId
  },
  level:{
    type:Number,
    enum:[0,1,2]
  },
	deleted: {
		type: Boolean,
		default: false
  },
  date: {
		type: Date,
		default: Date.now
	}
},{
  collection:'goodscat',
  id:false
})
/*
 * 发布为模型
 */ 
module.exports=mongoose.model('GoodsCat',goodsCatSchema)