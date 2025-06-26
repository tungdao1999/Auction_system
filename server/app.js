const express = require('express');
const app = express();
const routes = require('./routes');
const config = require('./config')

app.use(express.json());

app.use(`${config.app.apiPrefix}`, routes)

// test route
app.get('/test', (req, res) => {
  res.send('Hello Express!');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// export app
module.exports = app;