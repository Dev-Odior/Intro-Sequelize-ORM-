const fs = require('fs');
const { fileURLToPath } = require('url');
const path = require('path');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

let models = {};

async function registerModels(sequelize) {
  // This files in the directory
  const modelFiles = fs.readdirSync(__dirname);

  // remove any file that does not have .js extension and file not index.js
  const filteredModelFiles = modelFiles.filter((file) => {
    return file.endsWith('.js') && file !== 'index.js'; // Adjust filter as needed
  });

  for (const file of filteredModelFiles) {
    //  Construct the full path to the model file
    const filePath = path.join(__dirname, file);

    //  Dynamically require the model
    const model = require(filePath)(sequelize);

    models[model.name] = model;
  }

  // Register the models
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
  models.sequelize = sequelize;
}

module.exports = { registerModels, models };
