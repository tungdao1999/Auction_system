require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.APP_ENV || 'development',
  apiPrefix: '/api',
};