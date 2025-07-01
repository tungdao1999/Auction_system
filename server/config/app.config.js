require("dotenv").config();

module.exports = {
  port: process.env.APP_PORT || 3000,
  name: process.env.APP_NAME || 'Auction',
  nodeEnv: process.env.APP_ENV || 'development',
  apiPrefix: '/api',
};