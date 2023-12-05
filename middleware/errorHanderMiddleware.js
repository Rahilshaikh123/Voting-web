const errorHandlerMiddleware = (err, req, res, next) => {
  res.json({ msg: err.message });
};
module.exports = errorHandlerMiddleware;
