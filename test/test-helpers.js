const DataBase = require('../src/db/index');
const dbConfig = require('../src/config/database');
const App = require('../src/app');

let db;

class TestsHelpers {
  static async startDb() {
    db = new DataBase('test', dbConfig);
    await db.connect();
    return db;
  }

  static async stopDb() {
    await db.disconnect();
  }

  static async syncDb() {
    await db.sync();
  }

  static getApp() {
    return new App().getApp();
  }
}

module.exports = TestsHelpers;
