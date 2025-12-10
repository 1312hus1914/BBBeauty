// middleware/errorHandler.js
module.exports = function errorHandler(err, req, res, next) {
  console.error('Global error handler:', err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Server error',
    // expose stack only in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
