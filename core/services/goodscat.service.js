var _ = require("lodash");
var async = require("async");
var goodscatModel = require("../models/goodscat.model");

var getChildren = function(id, list, type) {
  var idArray = [];
  for (var i = 0; i < list.length; i++) {
    if (id == list[i].pid) {
      type == "document" ? idArray.push(list[i]) : idArray.push(list[i]._id);
      idArray.push(...getChildren(list[i]._id, list, type));
    }
  }
  return idArray;
};

var toTree = function(data, type) {
  data.forEach(function(item) {
    delete item.children;
  });

  var map = {};
  data.forEach(function(item) {
    map[item._id] = item;
  });

  var val = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].level >= type) continue;
    var parent = map[data[i].pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(data[i]);
    } else {
      val.push(data[i]);
    }
  }
  return val;
};

var changeTreeLevel = function(data, level) {
  for (var idx in data) {
    if (data[idx].children && data[idx].children.length > 0) {
      changeTreeLevel(data[idx].children, level + 1);
    }
    data[idx].level = level;
  }
};

/*
 * 查询商品分类--树状列表
 */
exports.tree = function(options, callback) {
  var query = {},
    pageSize,
    currentPage;
  var type = 3;
  if (_.isBoolean(options.deleted)) query.deleted = options.deleted;
  if (options.type) type = parseInt(options.type);
  if (options.currentPage) currentPage = parseInt(options.currentPage);
  if (options.pageSize) pageSize = parseInt(options.pageSize);

  async.waterfall(
    [
      function(cb) {
        goodscatModel
          .find(query)
          .sort("-date")
          .select("name pid level deleted")
          .lean()
          .exec(function(err, goodscats) {
            if (err) {
              err.type = "database";
              return cb(err);
            }
            cb(null, toTree(goodscats, type));
          });
      }
    ],
    function(err, goodscatTree) {
      if (err) return callback(err);

      if (!options.currentPage || !options.pageSize) {
        return callback(err, {
          list: goodscatTree
        });
      }

      var result = _.take(
        _.drop(goodscatTree, (currentPage - 1) * pageSize),
        pageSize
      );
      callback(err, {
        list: result,
        total: goodscatTree.length,
        pages: Math.ceil(goodscatTree.length / pageSize),
        currentPage: currentPage,
        pageSize: pageSize
      });
    }
  );
};
/*
 * 查询商品分类--根据id获取一个
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
  goodscatModel
    .findById(_id)
    .lean()
    .exec(function(err, cat) {
      if (err) {
        err.type = "database";
        return callback(err);
      }
      callback(null, cat);
    });
};
/*
 * 创建商品分类
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
  new goodscatModel(data).save(function(err, cat) {
    if (err) {
      err.type = "database";
      return callback(err);
    }
    callback(null, cat);
  });
};
/*
 * 删除商品分类--当前分类及其子分类
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
  async.waterfall(
    [
      function(cb) {
        goodscatModel
          .find({ deleted: false })
          .lean()
          .exec(function(err, goodscats) {
            if (err) {
              err.type = "database";
              return cb(err);
            }
            var ids = getChildren(_id, JSON.parse(JSON.stringify(goodscats)));
            ids.push(_id);
            cb(null, ids);
          });
      },
      function(ids, cb) {
        goodscatModel
          .updateMany(
            { $or: [{ _id: { $in: ids } }, { pid: { $in: ids } }] },
            { deleted: true },
            { runValidators: true }
          )
          .exec(function(err) {
            if (err) {
              err.type = "database";
              return cb(err);
            }
            cb(null);
          });
      }
    ],
    function(err, result) {
      callback(err);
    }
  );
};
/*
 * 修改商品分类
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
    return callback(err);
  }
  var data = options.data;
  var _id = options._id;

  async.auto(
    {
      updateSelf: function(cb) {
        goodscatModel
          .update({ _id: _id }, data, { runValidators: true })
          .exec(function(err) {
            if (err) {
              err.type = "database";
              return cb(err);
            }
            cb(null);
          });
      },
      findChildren: [
        "updateSelf",
        function(cb) {
          goodscatModel
            .find()
            .lean()
            .exec(function(err, goodscats) {
              if (err) {
                err.type = "database";
                return cb(err);
              }
              var children = getChildren(
                _id,
                JSON.parse(JSON.stringify(goodscats)),
                "document"
              );
              cb(null, toTree(children, 6));
            });
        }
      ],
      updateChildrenLevel: [
        "findChildren",
        async function(cb, result) {
          if (typeof options.data.level != "number") {
            return cb(null);
          }
          changeTreeLevel(result.findChildren, options.data.level + 1);
          var stark = [];
          stark = stark.concat(result.findChildren);
          while (stark.length) {
            var temp = stark.shift();
            try {
              await goodscatModel.update(
                { _id: temp._id },
                { level: temp.level },
                { runValidators: true }
              );
              if (temp.children) {
                stark = temp.children.concat(stark);
              }
            } catch (err) {
              err.type = "database";
              return cb(err);
            }
          }
          cb(null);
        }
      ]
    },
    function(err) {
      callback(err);
    }
  );
};
