const express = require('express');
const logger = require('morgan');

const environment = require('./config/environment');
const errorsMiddleware = require('./middleware/error');

const v1Routes = require('./controllers/index');

class App {
  constructor() {
    this.app = express();
    this.app.use(logger('dev', { skip: (req, res) => environment.nodeEnv === 'text' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.setRoutes();
  }

  setRoutes() {
    this.app.use('/v1', v1Routes);
    this.app.use(errorsMiddleware);
  }

  getApp() {
    return this.app;
  }

  listen() {
    const { port } = environment;
    this.app.listen(port, () => {
      console.log(`listening at port ${port} `);
    });
  }
}

module.exports = App;
