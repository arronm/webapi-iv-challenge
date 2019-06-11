require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

const logger = require('./middleware/logger');
const users = require('./users/userRouter');
const posts = require('./posts/postRouter');

const PORT = process.env.PORT || 4444;
const server = express();

// Express Middleware
const middleware = [
  helmet(),
  express.json(),
  logger,
];

server.use(middleware);

server.listen(PORT, () => {
  console.log(`\nAPI Version ${process.env.VER}\nServer listening on localhost:${PORT}\n`);
});

server.get('/', (req, res) => {
  res.send('API is working');
});

// user routes
server.use('/api/users', users);

// post routes
server.use('/api/posts', posts);
