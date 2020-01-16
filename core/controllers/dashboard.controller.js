var os = require('os');
var async = require('async');
var _ = require('lodash');
var packageInfo = require('../../package.json');
var usersService = require('../services/users.service');
var mongoose = require('mongoose');
/**
 * 控制面板数据
 */
module.exports = function (req, res) {
  async.parallel({
    systemInfo: function (callback) {
      var system = {
        version: packageInfo.version,
        osType: os.type(),
        osRelease: os.release(),
      };

      callback(null, system);
    },
    nodeInfo: function (callback) {
      var nodeInfo = process.versions;

      callback(null, nodeInfo);
    },
    databaseInfo: function (callback) {
      var mongodbAdmin = new mongoose.mongo.Admin(mongoose.connection.db);

      mongodbAdmin.buildInfo(function (err, info) {
        if (err) {
          err.type = 'database';
          return callback(err);
        }

        callback(null, _.pick(info, 'version'));
      });
    },
    adminsTotal: function (callback) {
      usersService.total({ type: 'admin' }, callback);
    }
  }, function (err, results) {
    if (err) {
      logger[err.type]().error(__filename, err);
      return res.status(500).end();
    }
    var data = {
      systemInfo: results.systemInfo,
      nodeInfo: results.nodeInfo,
      databaseInfo: results.databaseInfo,
      adminsTotal: results.adminsTotal,
    };
    res.status(200).json(data);
  });
};