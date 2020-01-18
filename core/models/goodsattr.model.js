var mongoose = require("mongoose");
/*
 * 分类参数模型
 */
var goodsAttrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'GoodsCat'
    },
    type: {
      type: String,
      enum: ["only", "many"],
      required: true
    },
    write: {
      type: String,
      enum: ["manual", "list"]
    },
    attrs:{
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "goodsattr",
    id: false
  }
);
/*
 * 发布为模型
 */
module.exports = mongoose.model("GoodsAttr", goodsAttrSchema);
