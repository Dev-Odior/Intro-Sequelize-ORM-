const fs = require('fs');
const path = require('path');
const { Model } = require('sequelize');

var models = {};

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

  // Add the sequelize instance to the model
  models.sequelize = sequelize;
}

module.exports = { registerModels, models };
