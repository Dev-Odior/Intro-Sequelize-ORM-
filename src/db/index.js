const { Sequelize } = require('sequelize');
const { registerModels } = require('../models/index.js');
const cls = require('cls-hooked');

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
    // set up the namespace for transaction
    const namespace = cls.createNamespace('transaction-namespace');
    Sequelize.useCLS(namespace);

    const connectionString = this.getConnectionString();

    // create the connection
    this.connection = new Sequelize(connectionString, {
      dialect: this.environment,
      logging: this.isTEstEnvironment ? false : console.log,
    });

    // check if we connected successfully
    try {
      await this.connection.authenticate({ logging: false });
      console.log('Connection has been established successfully');
    } catch (error) {
      console.log(`An error occurred ${error}`);
    }

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
      // force: this.isTEstEnvironment,
      force: true,
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
