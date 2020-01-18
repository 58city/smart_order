var logger = require("../../lib/logger.lib");
var goodsattrService = require("../services/goodsattr.service");
/*
 * 查询分类参数--普通列表
 */
exports.list = function(req, res) {
  req.checkQuery({
    name: {
      optional: true,
      isString: { errorMessage: "name 需为字符串" }
    },
    cid: {
      optional: true,
      isMongoId: { errorMessage: "cid 需为mongoId" }
    },
    type: {
      optional: true,
      isString: { errorMessage: "type 需为字符串" }
    },
    pageSize: {
      optional: true,
      isInt: { errorMessage: "pageSize 需为数字" }
    },
    currentPage: {
      optional: true,
      isInt: { errorMessage: "currentPage 需为数字" }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证失败", req.validationErrors());
    return res.status(400).end();
  }

  var query = {};
  if (req.query.name) query.name = { $regex: req.query.name };
  if (req.query.cid) query.cid = req.query.cid;
  if (req.query.type) query.type = req.query.type;
  if (req.query.pageSize) query.pageSize = req.query.pageSize;
  if (req.query.currentPage) query.currentPage = req.query.currentPage;

  goodsattrService.list(query, function(err, attrs) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(400).end();
    }
    res.status(200).json(attrs);
  });
};
/*
 * 查询分类参数--根据id获取一个
 */
exports.one = function(req, res) {
  req.checkParams({
    _id: {
      notEmpty: {
        options: [true],
        errorMessage: "_id 不能为空"
      },
      isMongoId: { errorMessage: "_id 需为 mongoId" }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证错误", req.validationErrors());
    return res.status(400).end();
  }
  var _id = req.params._id;
  goodsattrService.one({ _id: _id }, function(err, attr) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).json(attr);
  });
};
/*
 * 创建分类参数
 */
exports.create = function(req, res) {
  req.checkBody({
    name: {
      notEmpty: {
        options: [true],
        errorMessage: "name 不能为空"
      },
      isString: { errorMessage: "name需为字符串" }
    },
    cid: {
      notEmpty: {
        options: [true],
        errorMessage: "cid 不能为空"
      },
      isMongoId: { errorMessage: "cid 需为mongoId" }
    },
    type: {
      notEmpty: {
        options: [true],
        errorMessage: "type 不能为空"
      },
      isString: { errorMessage: "type 需为字符串" }
    },
    write: {
      optional: true,
      isString: { errorMessage: "write 需为字符串" }
    },
    attrs: {
      optional: true,
      isString: { errorMessage: "attrs 需为字符串" }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证失败", req.validationErrors());
    return res.status(400).end();
  }

  var data = {
    name: req.body.name,
    cid: req.body.cid,
    type: req.body.type
  };
  if (req.body.write) data.write = req.body.write;
  if (req.body.attrs) data.attrs = req.body.attrs;

  goodsattrService.create({ data: data }, function(err, attr) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).json(attr);
  });
};
/*
 * 删除分类参数
 */
exports.remove = function(req, res) {
  req.checkParams({
    _id: {
      notEmpty: {
        options: [true],
        errorMessage: "_id 不能为空"
      },
      isMongoId: { errorMessage: "_id 需为mongoId" }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证错误", req.validationErrors());
    return res.status(400).end();
  }
  var _id = req.params._id;
  goodsattrService.remove({_id:_id},function(err){
    if(err){
      logger[err.type]().error(__filename,err);
      return res.status(500).end();
    }
    res.status(200).end();
  })
};
/*
 * 修改分类参数
 */
exports.update = function(req, res) {
  req.checkParams({
    _id: {
      notEmpty: {
        options: [true],
        errorMessage: "_id 不能为空"
      },
      isMongoId: { errorMessage: "_id 需为mongoId" }
    }
  });
  req.checkBody({
    name: {
      optional: true,
      isString: { errorMessage: "name 需为字符串" }
    },
    cid: {
      optional: true,
      isMongoId: { errorMessage: "cid 需为mongoId" }
    },
    type: {
      optional: true,
      isString: { errorMessage: "name 需为字符串" }
    },
    attrs: {
      optional: true,
      isString: { errorMessage: "name 需为字符串" }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, "参数验证错误", req.validationErrors());
    return res.status(400).end();
  }

  var _id = req.params._id;
  var data = {};
  if (req.body.name) data.name = req.body.name;
  if (req.body.cid) data.cid = req.body.cid;
  if (req.body.type) data.type = req.body.type;
  if (req.body.attrs) data.attrs = req.body.attrs;

  goodsattrService.update({ _id: _id, data: data }, function(err) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).end();
  });
};
