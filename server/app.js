const express = require('express');
const app = express();
const routes = require('./routes');
const config = require('./config')
const cors = require('cors');
const wsModule = require('./websocket');

wsModule.setUpWs();
app.use(express.json());

var corsOptions = {
  origin: process.env.UI_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(`${config.app.apiPrefix}`, cors(corsOptions), routes);

// test route
app.get('/test', (req, res) => {
  res.send('Hello Express!');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// export app
module.exports = app;