const jwt = require('jsonwebtoken');
const environment = require('../config/environment');

class JWTUtils {
  static generateAccessToken(payload, options = {}) {
    const { expiresIn = '1d' } = options;
    return jwt.sign(payload, environment.jwtAccessTokenSecret, { expiresIn });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, environment.jwtRefreshTokenSecret);
  }

  static verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, environment.jwtAccessTokenSecret);
  }

  static verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, environment.jwtRefreshTokenSecret);
  }

  static verifyRefreshToken(token, option) {
    return jwt.verify(
      token,
      option === 'access' ? environment.jwtAccessTokenSecret : environment.jwtRefreshTokenSecret
    );
  }
}

module.exports = JWTUtils;
