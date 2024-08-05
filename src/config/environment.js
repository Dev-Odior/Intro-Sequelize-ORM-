const environment = {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'f8b7f7bf-5568-4e07-8255-cf64c01160a5',
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'f8b7f7bf-5568-4e07-8255-cf64c01160a5',
};

module.exports = environment;
