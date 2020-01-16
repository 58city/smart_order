var _ = require('lodash');
var logger = require('../../lib/logger.lib');
var rolesService = require('../services/roles.service');
/**
 * 获取多个角色
 */
exports.list = function (req, res) {
  var query={};
  if(req.query.search){
    query.search=req.query.search;
  }
  rolesService.all(query,function (err, roles) {
    if (err) {
      logger[err.type]().error(err);
      return res.status(500).end();
    }
    res.status(200).json(roles);
  });
};
/**
 * 获取单个角色
 */
exports.one = function (req, res) {
  req.checkParams({
    '_id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: { errorMessage: '_id 需为 mongoId' }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, '参数验证失败', req.validationErrors());
    return res.status(400).end();
  }
  var _id = req.params._id;
  rolesService.one({ _id: _id }, function (err, role) {
    if (err) {
      logger[err.type]().error(err);
      return res.status(500).end();
    }
    res.status(200).json(role);
  });
};
/**
 * 创建新的角色
 */
exports.create = function (req, res) {
  req.checkBody({
    'name': {
      notEmpty: {
        options: [true],
        errorMessage: 'name 不能为空'
      },
      isString: { errorMessage: 'name 需为字符串' }
    },
    'description': {
      optional: true,
      isString: { errorMessage: 'description 需为字符串' }
    },
    'authorities': {
      optional: true,
      inArray: {
        options: ['isNumber'],
        errorMessage: 'authorities 内需为数字'
      }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, '参数验证失败', req.validationErrors());
    return res.status(400).end();
  }
  var data = {
    name: req.body.name,
    description: req.body.description,
    authorities: req.body.authorities || []
  };
  rolesService.save({ data: data }, function (err, role) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).json(role);
  });
};
/**
 * 更新已有角色
 */
exports.update = function (req, res) {
  req.checkParams({
    '_id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: {errorMessage: 'name 需为 mongoId'}
    }
  });
  req.checkBody({
    'name': {
      optional: true,
      isString: { errorMessage: 'name 需为字符串' }
    },
    'description': {
      optional: true,
      isString: { errorMessage: 'description 需为字符串' }
    },
    'authorities': {
      optional: true,
      inArray: {
        options: ['isNumber'],
        errorMessage: 'authorities 内需为数字'
      }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, '参数验证失败', req.validationErrors());
    return res.status(400).end();
  }
  var _id = req.params._id;
  var data = {
    name: req.body.name,
    authorities: req.body.authorities
  };
  if (req.body.description) data.description = req.body.description;
  rolesService.save({ _id: _id, data: data }, function (err) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(204).end();
  });
};
/**
 * 删除单个角色
 */
exports.remove = function (req, res) {
  req.checkParams({
    '_id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: {errorMessage: '_id 需为 mongoId'}
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, '参数验证失败', req.validationErrors());
    return res.status(400).end();
  }
  var _id = req.params._id;
  rolesService.remove({ _id: _id }, function (err) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    // 对于a标签，如果链接的页面响应码为204，页面不会发生跳转
    // 提交form，正常情况下，页面会跳转，但是如果响应的状态码是204，此时页面也不会发生转跳
    // 对于一些提交到服务器处理的数据，只需要返回是否成功的情况下，可以考虑使用状态码204来作为返回信息，从而省掉多余的数据传输。
    res.status(204).end();
  });
};
/**
 * 删除多个角色
 */
exports.removeMany = function(req,res){
  req.checkQuery({
    '_ids': {
      notEmpty: {
        options: [true],
        errorMessage: '_ids 不能为空'
      },
      inArray: {
        options: ['isMongoId'],
        errorMessage: '_ids 内需为mongoId'
      }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, '参数验证失败', req.validationErrors());
    return res.status(400).end();
  }
  var ids=req.query._ids;
  rolesService.removeMany({_ids:ids},function(err){
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(204).end();
  })
}