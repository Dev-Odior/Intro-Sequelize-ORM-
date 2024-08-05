// IIFE = immediately invoked function expressions?

const environment = require('./config/environment.js');
const DataBase = require('./db/index.js');
const dbConfig = require('./config/database.js');
const App = require('./app.js');

(async () => {
  try {
    // connect to the db
    const db = new DataBase(environment.nodeEnv, dbConfig);
    await db.connect();
    const app = new App()
    app.listen()
  } catch (error) {
    console.error(`App initialization error ${error.stack}`);
  }
})();
