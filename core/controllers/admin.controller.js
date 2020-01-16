var logger = require('../../lib/logger.lib');
var sha1 = require('../services/sha1.service');
var usersService = require('../services/users.service');
/**
 * 获取单个用户
 */
exports.one = function (req, res) {
  req.checkParams({
    '_id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: { errorMessage: '_id  需为 mongoId' }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, '参数验证失败', req.validationErrors());
    return res.status(400).end();
  }
  usersService.one({ _id: req.params._id }, function (err, user) {
    if (err) {
      logger[err.type]().error(err);
      return res.status(500).end();
    }
    res.status(200).json(user);
  });
};
/**
 * 获取多个管理员用户
 */
exports.list = function (req, res) {
  var query={type: 'admin'};
  if(req.query.search){
    query.search=req.query.search;
  }
  usersService.list(query, function (err, users) {
    if (err) {
      logger[err.type]().error(err);
      return res.status(500).end();
    }
    res.status(200).json(users);
  });
};
/**
 * 创建管理用户
 */
exports.create = function (req, res) {
  req.checkBody({
    'email': {
      notEmpty: {
        options: [true],
        errorMessage: 'email 不能为空'
      },
      isEmail: { errorMessage: 'email 格式不正确' }
    },
    'nickname': {
      notEmpty: {
        options: [true],
        errorMessage: 'nickname 不能为空'
      },
      isString: { errorMessage: 'nickname 需为字符串' }
    },
    'password': {
      notEmpty: {
        options: [true],
        errorMessage: 'password 不能为空'
      },
      isLength: {
        options: [6],
        errorMessage: 'password 不能小于 6 位'
      }
    },
    'role': {
      notEmpty: {
        options: [true],
        errorMessage: 'role 不能为空'
      },
      isMongoId: { errorMessage: 'role 需为 mongoId' }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, '参数验证失败', req.validationErrors() );
    return res.status(400).end();
  }
  var data = {
    type: 'admin',
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,
    role: req.body.role
  };
  usersService.save({ data: data }, function (err, user) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(200).json({ _id: user._id });
  });
};

/**
 * 更新管理用户
 */
exports.update = function (req, res) {
  req.checkParams({
    '_id': {
      notEmpty: {
        options: [true],
        errorMessage: '_id 不能为空'
      },
      isMongoId: {errorMessage: '_id 需为 mongoId'}
    }
  });
  req.checkBody({
    'email': {
      optional: true,
      isEmail: { errorMessage: 'email 格式不正确' }
    },
    'nickname': {
      optional: true,
      isString: { errorMessage: 'nickname 需为字符串' }
    },
    'password': {
      optional: true,
      isLength: {
        options: [6],
        errorMessage: 'password 不能小于 6 位'
      }
    },
    'role': {
      optional: true,
      isMongoId: { errorMessage: 'role 需为 mongoId' }
    }
  });
  if (req.validationErrors()) {
    logger.system().error(__filename, '参数验证失败', req.validationErrors());
    return res.status(400).end();
  }
  var _id = req.params._id;
  var data = {
    type: 'admin',
    email: req.body.email,
    nickname: req.body.nickname,
    role: req.body.role
  };
  if (req.body.password) data.password = sha1(req.body.password);
  usersService.save({ _id: _id, data: data }, function (err) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(204).end();
  });
};
/**
 * 删除单个管理用户
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
  usersService.remove({ _id: _id }, function (err) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(204).end()
  });
};
/**
 * 删除多个管理用户
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
  usersService.removeMany({_ids:ids},function(err){
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    res.status(204).end();
  })
}