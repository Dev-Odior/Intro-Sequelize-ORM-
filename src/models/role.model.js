const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsTo(models['User'], { foreignKey: 'userId' });
    }
  }

  Role.init(
    {
      role: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'Role' }
  );

  return Role;
};
