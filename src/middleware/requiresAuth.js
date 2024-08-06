const JwtUtils = require('../utils/jwt.utils');

function requiresAuth(tokenType = 'accessToken') {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      // why is he using var -- we are suing it for scoping let and const has block scope

      try {
        var [bearer, token] = authHeader.split(' ');

        if (bearer.toLowerCase() !== 'bearer' || !token) {
          throw Error;
        }
      } catch (error) {
        return res.status(401).send({ success: false, message: 'Bearer token malformed' });
      }
    } else {
      return res.status(401).send({ success: false, message: `Authorization header not found` });
    }

    try {
      let jwt;
      switch (tokenType) {
        case 'refreshToken':
          jwt = JwtUtils.verifyRefreshToken(token);
        case 'accessToken':
        default:
          jwt = JwtUtils.verifyAccessToken(token);
      }

      req.body.jwt = jwt;
      next();
    } catch (error) {
      return res.status(401).send({ success: false, message: 'invalid token' });
    }
  };
}

module.exports = requiresAuth;
