const express = require('express');

require('./utils/db');
const config = require('./config/dev');
const UserRouter = require('./router/user');

const app = express();

//middleware
app.use(express.json());

app.use('/api/v1', UserRouter);

app.listen(config.port, () => {
  console.log(`Server is listening ${config.port}`);
})