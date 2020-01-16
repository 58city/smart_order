/**
 * 移动端首页
 */
module.exports = function (req, res) {
  res.sendFile('mobile.html', { root: './view/mobile' });
};