// IIFE = immediately invoked function expressions?

const environment = require('./config/environment.js');
const DataBase = require('./db/index.js');
const dbConfig = require('./config/database.js');

(async () => {
  try {
    // connect to the db
    const db = new DataBase(environment.nodeEnv, dbConfig);
    await db.connect();
  } catch (error) {
    console.error(`App initialization error ${error.stack}`);
  }
})();
