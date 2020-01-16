/**
 * 404 错误
 */
exports.notFound = function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
};
/**
 * 其他错误
 */
exports.error = function (err, req, res, next) {
	if (err && err.status !== 404) logger.system().error(err);
	var views = '';
	if (err.status === 404) {
		views = '404';
	} else {
		views = 'error';
	}
	res.render(views);
};