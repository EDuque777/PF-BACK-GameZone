const express = require('express');
const morgan = require('morgan');

const usersRoutes = require('./routes/users.routes');
const gamesRoutes = require('./routes/games.routes');

const app = express();

app.use(morgan('dev'))
app.use(express.json());

app.use(usersRoutes);
app.use(gamesRoutes);

app.listen(3001)
console.log('server on port 3001');