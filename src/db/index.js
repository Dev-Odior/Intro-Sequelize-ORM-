const { Sequelize } = require('sequelize');
const registerModels = require('../models/index.js');

module.exports = class DataBase {
  constructor(environment, dbConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig;
    this.isTEstEnvironment = this.environment === 'test';
  }

  getConnectionString() {
    const { username, password, host, port, database } = this.dbConfig[this.environment];

    return `postgres://${username}:${password}@${host}:${port}/${database}`;
  }

  async connect() {
    const connectionString = this.getConnectionString();

    // create the connection
    this.connection = new Sequelize(connectionString, {
      dialect: this.environment,
      logging: this.isTEstEnvironment ? false : console.log,
    });

    // check if we connected successfully
    await this.connection.authenticate({ logging: false });

    if (!this.isTEstEnvironment) {
      console.log('Connection has been established successfully');
    }

    // register the models
    registerModels(this.connection);

    // sync the models
    await this.sync();
  }

  async sync() {
    this.connection.sync({
      force: this.isTEstEnvironment,
      logging: false,
    });

    if (!this.isTEstEnvironment) {
      console.log('Models synchronized successfully');
    }
  }

  async disconnect() {
    await this.connection.close();
  }
};
