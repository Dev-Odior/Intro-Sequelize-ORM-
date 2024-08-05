const bcrypt = require('bcrypt');
const environment = require('../config/environment');

class PasswordUtils {
  static async hashPassword(password) {
    return bcrypt.hash(password, environment.saltRounds);
  }

  static async comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default PasswordUtils;
