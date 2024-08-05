const express = require('express');

const logger = require('morgan');

const environment = require('./config/environment');

class App {
  constructor() {
    this.app = express();
    this.app.use(logger('dev', { skip: (req, res) => environment.nodeEnv === 'text' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.setRoutes();
  }

  setRoutes() {}

  getApp() {}

  listen() {
    const { port } = environment;
    this.app.listen(port, () => {
      console.log(`listening at port ${port} `);
    });
  }
}

module.exports = App;
