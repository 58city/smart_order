var _ = require('lodash');
var async = require('async');
var rolesModel = require('../models/roles.model');
var usersModel = require('../models/users.model');
/**
 * 获取多个角色
 */
exports.all = function (options,callback) {
  var query={}
  if(options.search){
    var query={
      $or : [
        {name : {$regex : options.search}},
        {description : {$regex : options.search}}
      ]
    }
  }
  rolesModel.find(query).lean().exec(function (err, roles) {
    if (err) {
      err.type = 'database';
      return callback(err);
    }
    callback(null, roles);
  });
};
/**
 * 获取单个角色
 */
exports.one = function (options, callback) {
  if (!options._id) {
    var err = {
      type: 'system',
      error: '没有 _id 传入'
    };
    return callback(err);
  }
  var _id = options._id;
  rolesModel.findById(_id).lean().exec(function (err, role) {
    if (err) {
      err.type = 'database';
      return callback(err);
    }
    callback(null, role)
  });
};
/**
 * 创建或更新角色
 */
exports.save = function (options, callback) {
  if (!options.data) {
    var err = {
      type: 'system',
      error: '没有 data 传入'
    };
    return callback(err);
  }
  var _id = options._id;
  var data = options.data;
  if (!_.isEmpty(data.authorities)) {
    var isAdmin =  _.find(data.authorities, function (authority) {
      if (authority === 100000) return true;
    });
    if (isAdmin) {
      var err = {
        type: 'system',
        error: '不允许更新或创建权限为 100000 的角色'
      };
      return callback(err);
    }
  }
  if (_id) {
    // 在Mongoose 4.x,update验证器默认是关闭的，这里开启才会触发mongoose.Schema里的验证程序
    rolesModel.update({ _id: _id }, data, { runValidators: true }, function (err) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }
      callback();
    });
  } else {
    new rolesModel(data).save(function (err, role) {
      if (err) {
        err.type = 'database';
        return callback(err);
      }
      callback(null, role);
    });
  }
};
/**
 * 删除单个角色
 */
exports.remove = function (options, callback) {
  if (!options._id) {
    var err = {
      type: 'system',
      error: '没有 _id 传入'
    };
    return callback(err);
  }
  var _id = options._id;
  rolesModel.findById(_id, function (err, role) {
    if (err) {
      err.type = 'database';
      return callback(err);
    }
    if (!role) return callback();
    var isAdmin = _.find(role.authorities, function (authority) {
      if (authority === 100000) return true;
    });
    if (isAdmin) {
      var err = {
        type: 'system',
        error: '不允许删除权限存在 100000 的角色'
      };
      return callback(err);
    }
    async.parallel([
      function (callback) {
        role.remove(function (err) {
          if (err) {
            err.type = 'database';
            return callback(err);
          }
          callback();
        });
      },
      function (callback) {
        usersModel.update({ role: role._id }, { $unset: { role: true } }, function (err) {
          if (err) {
            err.type = 'database';
            return callback(err);
          }
          callback();
        });
      }
    ], function (err) {
      callback(err);
    });
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
  rolesModel.find({_id:{$in:_ids}}, function (err, roles) {
    if (err) {
      err.type = 'database';
      return callback(err);
    }
    if (!roles) return callback();
    async.series({
      isAdmin:function(cb){
        var isAdmin;
        _.forEach(roles,function(role){
          isAdmin = _.find(role.authorities, function (authority) {
            if (authority === 100000) return true;
          });
        })
        if (isAdmin) {
          var err = {
            type: 'system',
            error: '删除的角色中包含 100000 的角色'
          };
          return cb(err);
        }
        cb(null);
      },
      removeRoles:function(cb){
        rolesModel.remove({_id:{$in:_.map(roles,'_id')}},function(err,result){
          if(err){
            err.type='database';
            return cb(err);
          }
          cb();
        })
      },
      updateUsers:function(cb){
        usersModel.updateMany({role:{$in:_.map(roles,'_id')}}, { $unset: { role: true } }, function (err) {
          if (err) {
            err.type = 'database';
            return cb(err);
          }
          cb();
        });
      }
    },function(err,result){
      callback(err);
    })
  });
};