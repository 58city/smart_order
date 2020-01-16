/**
 * 后台首页
 */
module.exports = function (req, res) {
  res.sendFile('admin.html', { root: './view/backend' });
};