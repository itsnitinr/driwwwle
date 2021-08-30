require('dotenv').config({ path: './config.env' });

const express = require('express');
const http = require('http');
const next = require('next');
const connectDB = require('./server-utils/connectDB');

const app = express();
app.use(express.json());
const server = http.Server(app);
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

connectDB();

nextApp.prepare().then(() => {
  app.use('/api/signup', require('./api/signup'));
  app.use('/api/onboarding', require('./api/onboarding'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/posts', require('./api/posts'));
  app.use('/api/profile', require('./api/profile'));

  app.all('*', (req, res) => handle(req, res));
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express server running on port ${PORT}`);
  });
});
