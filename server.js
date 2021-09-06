require('dotenv').config({ path: './config.env' });

const express = require('express');
const http = require('http');
const next = require('next');
const connectDB = require('./server-utils/connectDB');

const app = express();
app.use(express.json());
const server = http.Server(app);
const io = require('socket.io')(server);
const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const { addUser, removeUser } = require('./server-utils/sockets');

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

connectDB();

io.on('connection', (socket) => {
  socket.on('join', async ({ userId }) => {
    const users = await addUser(userId, socket.id);
    setInterval(() => {
      socket.emit('connectedUsers', {
        users: users.filter((user) => user.userId !== userId),
      });
    }, 10000);
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });
});

nextApp.prepare().then(() => {
  app.use('/api/search', require('./api/search'));
  app.use('/api/signup', require('./api/signup'));
  app.use('/api/onboarding', require('./api/onboarding'));
  app.use('/api/auth', require('./api/auth'));
  app.use('/api/posts', require('./api/posts'));
  app.use('/api/profile', require('./api/profile'));
  app.use('/api/notifications', require('./api/notifications'));
  app.use('/api/chats', require('./api/chats'));

  app.all('*', (req, res) => handle(req, res));
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express server running on port ${PORT}`);
  });
});
