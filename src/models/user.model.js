const { DataTypes, Model, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const environment = require('../config/environment');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {}

    static async hashedPassword(password) {
      return bcrypt.hash(password, environment.saltRounds);
    }

    static async comparePasswords(password, hashedPassword) {
      return bcrypt.compare(password, hashedPassword);
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Not a valid email address',
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING(50),
        unique: true,
      },

      firstName: {
        type: DataTypes.STRING(50),
        validate: {
          len: {
            args: [0, 50],
            msg: 'First name has too many characters',
          },
        },
      },

      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 50],
            msg: 'Last name has too many characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      indexes: [{ unique: true, fields: ['email'] }],

      hooks: {
        beforeSave: async (user) => {
          const hashedPassword = await User.hashedPassword(user.password);
          user.password = hashedPassword;
        },
      },
    }
  );

  return User;
};
