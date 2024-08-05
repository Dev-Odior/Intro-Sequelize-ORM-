const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class RefreshToken extends Model {
    static associate(models) {
      console.log(models['User']);
      RefreshToken.belongsTo(models['User']);
    }
  }

  RefreshToken.init(
    {
      token: {
        type: DataTypes.TEXT,
      },
    },
    { sequelize, modelName: 'RefreshToken' }
  );

  return RefreshToken;
};
