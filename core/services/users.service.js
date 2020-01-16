var async = require('async');
var _ = require('lodash');
var usersModel = require('../models/users.model');
var rolesModel = require('../models/roles.model');
/**
 * 查询用户
 */
exports.one = function (options, callback) {
  var selectPassword = options.selectPassword || false;
  var query = {};
  if (options.email) query.email = options.email;
  if (options._id) query._id = options._id;
  if (options.nickname) query.nickname = options.nickname;
  usersModel.findOne(query)
    .select('type nickname email password role')
    .populate('role', 'name description authorities')
    .lean()
    .exec(function (err, user) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }
      if (!user) return callback();
      if (!selectPassword) {
        delete user.password;
      }
      callback(null, user);
    });
};
/**
 * 用户列表
 */
exports.list = function (options, callback) {
  var query = {};
  if (options.type) query.type = options.type;
  if (options.search){
    var query={
      $or : [
        {email : {$regex : options.search}},
        {nickname : {$regex : options.search}}
      ]
    }
  }
  usersModel.find(query)
    .select('type nickname email role')
    .populate('role', 'name description authorities')
    .lean()
    .exec(function (err, users) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }
      callback(null, users);
    });
};
/**
 * 存储用户
 */
exports.save = function (options, callback) {
  if (!options.data || (!options.userSelf && !_.get(options, 'data.role'))) {
    var err = {
      type: 'system',
      error: '没有传入 data 或 role'
    };

    return callback(err);
  }

  var _id = options._id;
  var data = options.data;
  var userSelf = options.userSelf;

  if (_id) {
    usersModel.findById(_id)
      .populate('role')
      .exec(function (err, user) {
        if (err) {
          err.type = 'database';
          return callback(err);
        }

        var isSuAdmin =  _.find(_.get(user, 'role.authorities'), function (authory) {
          return authory === 100000;
        });

        if (isSuAdmin && !userSelf) {
          var err = {
            type: 'system',
            error: '不允许更新权限存在 100000 的用户'
          };
          return callback(err);
        }

        usersModel.update({ _id: _id }, data, { runValidators: true }, function (err) {
          if (err) {
            err.type = 'database';
            return callback(err);
          }

          callback();
        });
      });
  } else {
    rolesModel.findById(data.role)
      .lean()
      .exec(function (err, role) {
        if (err) {
          err.type = 'database';
          return callback(err);
        }

        if (!role) {
          var err = {
            type: 'system',
            error: '没有找到 role'
          };
          return callback(err);
        }

        var isSuAdmin =  _.find(role.authorities, function (authory) {
          return authory === 100000;
        });

        if (isSuAdmin) {
          var err = {
            type: 'system',
            error: '不允许创建权限存在 100000 的用户'
          };
          return callback(err);
        }

        new usersModel(data).save(function (err, user) {
          if (err) {
            err.type = 'database';
            return callback(err);
          }

          callback(null, user);
        });
      });
  }
};
/**
 * 删除单个用户
 */
exports.remove = function (options, callback) {
  if (!options._id) {
    var err = {
      type: 'system',
      error: '没有传入 _id'
    };
    return callback(err);
  }
  var _id = options._id;
  usersModel.findById(_id).populate('role').exec(function (err, user) {
    if (err) {
      err.type = 'database';
      return callback(err);
    }
    if (!user) return callback();
    var isSuAdmin =  _.find(_.get(user, 'role.authorities'), function (authory) {
      return authory === 100000;
    });
    if (isSuAdmin) {
      var err = {
        type: 'system',
        error: '不允许删除权限存在 100000 的用户'
      };
      return callback(err);
    }
    user.remove(function (err) {
      if (err) err.type = 'database';
      callback(err);
    })
  });
};
/**
 * 删除多个角色
 */
exports.removeMany = function (options, callback) {
  if (!options._ids) {
    var err = {
      type: 'system',
      error: '没有 _ids数组 传入'
    };
    return callback(err);
  }
  var _ids = options._ids;
  usersModel.find({_id:{$in:_ids}}).populate('role').exec(function (err, users) {
    if (err) {
      err.type = 'database';
      return callback(err);
    }
    if (!users) return callback();
    async.series({
      isAdmin:function(cb){
        var isAdmin;
        _.forEach(users,function(user){
          isAdmin = _.find(user.role.authorities, function (authority) {
            if (authority === 100000) return true;
          });
        })
        if (isAdmin) {
          var err = {
            type: 'system',
            error: '删除的管理员中包含 100000 的角色'
          };
          return cb(err);
        }
        cb(null);
      },
      removeAdmins:function(cb){
        usersModel.remove({_id:{$in:_.map(users,'_id')}},function(err,result){
          if(err){
            err.type='database';
            return cb(err);
          }
          cb();
        })
      }
    },function(err,result){
      callback(err);
    })
  });
};
/**
 * 用户总数
 */
exports.total = function (options, callback) {
  usersModel.count({ type: options.type }, function (err, count) {
    if (err) {
      err.type = 'database';
      return callback(err);
    }
    callback(null, count);
  });
};