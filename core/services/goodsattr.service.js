var _ = require("lodash");
var async = require("async");
var goodsattrModel = require("../models/goodsattr.model");
var goodscatModel = require("../models/goodscat.model");
/*
 * 查询分类参数--普通列表
 */
exports.list = function(options, callback) {
  var query = {},
    pageSize,
    currentPage;
  if (options.name) query.name = options.name;
  if (options.cid) query.cid = options.cid;
  if (options.type) query.type = options.type;
  if (options.currentPage) currentPage = options.currentPage;
  if (options.pageSize) pageSize = options.pageSize;

  async.auto(
    {
      getAllAttrs: function(cb) {
        goodsattrModel
          .find(query)
          .sort("-date")
          .select("name cid type attrs write")
          .populate("cid", "_id name")
          .lean()
          .exec(function(err, attrs) {
            if (err) {
              err.type = "database";
              return cb(err);
            }
            cb(null, attrs);
          });
      },
      getJsonData: [
        "getAllAttrs",
        function(cb, result) {
          if (!options.currentPage || !options.pageSize) {
            return cb(null, {
              list: result.getAllAttrs
            });
          }
          var list = _.take(
            _.drop(result.getAllAttrs, (currentPage - 1) * pageSize),
            pageSize
          );
          cb(null, {
            list: list,
            total: result.getAllAttrs.length,
            pages: Math.ceil(result.getAllAttrs.length / pageSize),
            currentPage: currentPage,
            pageSize: pageSize
          });
        }
      ]
    },
    function(err, result) {
      if (err) return callback(err);
      callback(null, result.getJsonData);
    }
  );
};
/*
 * 查询分类参数--根据id获取一个
 */
exports.one = function(options, callback) {
  if (!options._id) {
    var err = {
      type: "system",
      error: "没有 _id 传入"
    };
    return callback(err);
  }
  var _id = options._id;
  goodsattrModel
    .findById(_id)
    .lean()
    .exec(function(err, attr) {
      if (err) {
        err.type = "database";
        return callback(err);
      }
      callback(null, attr);
    });
};
/*
 * 创建分类参数
 */
exports.create = function(options, callback) {
  if (!options.data) {
    var err = {
      type: "system",
      error: "没有 data 传入"
    };
    return callback(err);
  }
  var data = options.data;
  new goodsattrModel(data).save(function(err, attr) {
    if (err) {
      err.type = "database";
      return callback(err);
    }
    callback(null, attr);
  });
};
/*
 * 删除分类参数
 */
exports.remove = function(options, callback) {
  if (!options._id) {
    var err = {
      type: "system",
      error: "没有 _id 传入"
    };
    return callback(err);
  }
  var _id = options._id;
  goodsattrModel
    .remove({ _id: _id })
    .exec(function(err,res) {
      if (err) {
        err.type = "database";
        return callback(err);
      }
      callback(null);
    });
};
/*
 * 修改分类参数
 */
exports.update = function(options, callback) {
  if (!options._id) {
    var err = {
      type: "system",
      error: "没有 _id 传入"
    };
    return callback(err);
  }
  if (!options.data) {
    var err = {
      type: "system",
      error: "没有 data 传入"
    };
  }
  var data = options.data;
  var _id = options._id;

  goodsattrModel
    .update({ _id: _id }, data, { runValidators: true })
    .exec(function(err) {
      if (err) {
        err.type = "database";
        return callback(err);
      }
      callback(null);
    });
};
