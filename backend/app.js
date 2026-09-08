const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const env = require('./src/config/env');
const errorHandler = require('./src/middleware/errorHandler');

const authRoutes = require('./src/modules/auth/auth.routes');
const meRoutes = require('./src/modules/me/me.routes');
const projectRoutes = require('./src/modules/project/project.routes');
const usersRoutes = require('./src/modules/user/user.routes');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  }),
);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/me', meRoutes);
app.use('/projects', projectRoutes);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server is listening on ${env.port}`);
});
