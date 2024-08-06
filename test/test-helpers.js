const DataBase = require('../src/db/index');
const dbConfig = require('../src/config/database');

class TestsHelpers {
  constructor() {
    this.db = new DataBase('test', dbConfig);
  }

  async startDb() {
    await this.db.connect();
  }

  async stopDb() {
    await this.db.disconnect();
  }

  async syncDb() {
    await this.db.sync();
  }

  getApp() {
    const App = require('../src/app');
    return new App().getApp();
  }
}

module.exports = TestsHelpers;
