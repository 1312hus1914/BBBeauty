// middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

// General API limiter (optional)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
  message: { message: 'Too many requests, please try again later.' },
});

// Stricter limiter for auth routes (login/register)
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,  // 15 minutes
//   max: 10,                   // 10 attempts
//   message: { message: 'Too many login attempts, please try again later.' },
// });

module.exports = {
  apiLimiter,
  //authLimiter,
};
