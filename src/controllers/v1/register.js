const { Router } = require('express');
const { models } = require('../../models/index');

const JwtUtils = require('../../utils/jwt.utils');
const runAsyncWrapper = require('../../utils/runAsyncWrapper');

const router = Router();

router.post(
  '/register',
  runAsyncWrapper(async (req, res, next) => {
    const { email, password, roles } = req.body;

    const User = models.User;
    const Role = models.Role;
    const sequelize = models.sequelize;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(200).send({ success: false, message: 'user already exists' });
    }

    try {
      const result = await sequelize.transaction(async (t) => {

        // const roleAttribute = 

        const newUser = await User.create({ email, password });
        const jwtPayload = { email };

        const accessToken = JwtUtils.generateAccessToken(jwtPayload);
        const refreshToken = JwtUtils.generateAccessToken(jwtPayload);

        // we have access to this because of the associations
        await newUser.createRefreshToken({ token: refreshToken });

        if (roles && Array.isArray(roles)) {
          roles.map(async (role) => {
            await Role.create({ role, userId: newUser.id });
          });
        }

        // if (roles && Array.isArray(roles)) {
        //   // Ensure all role creations are completed before proceeding
        //   await Promise.all(roles.map((role) => Role.create({ role, userId: newUser.id })));
        // }

        return { accessToken, refreshToken };
      });

      const { accessToken, refreshToken } = result;

      const users = await User.findAll({
        include: [Role],
      });

      return res.status(200).send({
        success: true,
        message: 'User successfully created',
        data: {
          accessToken,
          refreshToken,
          users,
        },
      });
    } catch (error) {
      console.error('Error registering the user:/n', error);
      return res.status(500).send({ success: false, message: error.message });
    }
  })
);

module.exports = router;
