var logger = require("../../lib/logger.lib");
var goodscatService = require("../services/goodscat.service");
/*
 * 查询商品分类--树状列表
 */
exports.tree = function(req, res) {
  req.checkQuery({
    type: {
      optional: true,
      isInt: { errorMessage: "type 需为数字" }
    },
    deleted: {
      optional: true,
      isBoolean: { errorMessage: "deleted 需为布尔值" }
    },
    pageSize: {
      optional: true,
      isInt: { errorMessage: "pageSize 需为数字" }
    },
    currentPage: {
      optional: true,
      isInt: { errorMessage: "currentPage 需为1-3的数字" }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证失败", req.validationErrors());
    return res.status(400).end();
  }

  var query = {};
  if (req.query.type) query.type = req.query.type;
  if (req.query.deleted === "true") {
    query.deleted = true;
  } else if (req.query.deleted === "false") {
    query.deleted = false;
  }
  if (req.query.pageSize) query.pageSize = req.query.pageSize;
  if (req.query.currentPage) query.currentPage = req.query.currentPage;

  goodscatService.tree(query, function(err, result) {
    if (err) {
      logger[err.type]().error(err);
      return res.status(500).end();
    }
    res.status(200).json(result);
  });
};
/*
 * 查询商品分类--根据id获取一个
 */
exports.one = function(req, res) {
  req.checkParams({
    _id: {
      notEmpty: {
        options: [true],
        errorMessage: "_id 不能为空"
      }
    },
    isMongoId: { errorMessage: "_id 需为 mongoId" }
  });
  if (req.validationErrors()) {
    logger.system.error(__filename, "参数验证错误", req.validationErrors());
    return res.status(400).end();
  }
  var _id = req.params._id;
  goodscatService.one({ _id: _id }, function(err, cat) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).json(cat);
  });
};
/*
 * 创建商品分类
 */
exports.create = function(req, res) {
  req.checkBody({
    name: {
      notEmpty: {
        options: [true],
        errorMessage: "name 不能为空"
      },
      isString: { errorMessage: "name 需为字符串" }
    },
    pid: {
      notEmpty: {
        options: [true],
        errorMessage: "pid 不能为空"
      },
      isMongoId: { errorMessage: "pid 需为 mongoId" }
    },
    level: {
      notEmpty: {
        options: [true],
        errorMessage: "level 不能为空"
      },
      isInt: { errorMessage: "level 需为数字" }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证失败", req.validationErrors());
    return res.status(400).end();
  }

  var data = {
    name: req.body.name,
    pid: req.body.pid,
    level: req.body.level
  };

  goodscatService.create({ data: data }, function(err, cat) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).json(cat);
  });
};
/*
 * 删除商品分类--当前分类及其子分类
 */
exports.remove = function(req, res) {
  req.checkParams({
    _id: {
      notEmpty: {
        options: [true],
        errorMessage: "_id 不能为空"
      }
    },
    isMongoId: { errorMessage: "_id 需为 mongoId" }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证失败", req.validationErrors());
    return res.status(400).end();
  }
  var _id = req.params._id;
  goodscatService.remove({ _id: _id }, function(err) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).end();
  });
};
/*
 * 修改商品分类
 */
exports.update = function(req, res) {
  req.checkParams({
    _id: {
      notEmpty: {
        options: [true],
        errorMessage: "_id 不能为空"
      },
      isMongoId: { errorMessage: "_id 需为 mongoId" }
    }
  });
  req.checkBody({
    name: {
      optional: true,
      isString: { errorMessage: "name 需为字符串" }
    },
    pid: {
      optional: true,
      isMongoId: { errorMessage: "pid 需为 mongoId" }
    },
    level: {
      optional: true,
      isInt: { errorMessage: "level 需为数字" }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证失败", req.validationErrors());
    return res.status(400).end();
  }

  var _id = req.params._id;
  var data = {};
  if (req.body.name) data.name = req.body.name;
  if (req.body.pid) data.pid = req.body.pid;
  if (typeof req.body.level == "number") data.level = req.body.level;

  goodscatService.update({ _id: _id, data: data }, function(err) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).end();
  });
};
