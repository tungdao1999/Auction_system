const express = require('express');
const app = express();

app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// export app
module.exports = app;