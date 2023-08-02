const mongoose = require('mongoose');

const config = require('../config/dev');

mongoose.connect(config.mongo.url)
  .then(() => {
    console.log('connection is successfully.');
  })
  .catch((err) => {
    console.log('Unable to connection mongo. Please try again latter', err);
  })

