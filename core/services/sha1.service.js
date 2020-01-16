var crypto = require('crypto');
/**
 * 进行 SHA1 加密
 */
module.exports = function (value) {
  var sha1 = crypto.createHash('sha1');
  sha1.update(value);
  return sha1.digest('hex');
};