const DataBase = require('../src/db/index');
const dbConfig = require('../src/config/database');

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
}

module.exports = TestsHelpers;
