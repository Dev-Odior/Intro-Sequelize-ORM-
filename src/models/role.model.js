const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsTo(models['User']);
    }
  }

  Role.init(
    {
      role: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: 'Role' }
  );

  return Role;
};
