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

    const user = await User.findOne({ where: { email } });

    // const user = true;

    if (user) {
      return res.status(200).send({ success: false, message: 'user already exists' });
    }

    try {
      const newUser = await User.create({ email, password });
      const jwtPayload = { email };

      const accessToken = JwtUtils.generateAccessToken(jwtPayload);
      const refreshToken = JwtUtils.generateAccessToken(jwtPayload);

      // we have access to this because of the associations
      await newUser.createRefreshToken({ token: refreshToken });

      if (roles && Array.isArray(roles)) {
        const rolesToSave = [];
        roles.forEach(async (role) => {
          const newRole = await Role.create({ role });
          rolesToSave.push(newRole);
        });

        // i can do this because of the associations
        await newUser.addRoles(rolesToSave);
      }

      return res.status(200).send({
        success: true,
        message: 'User successfully created',
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error('Error registering the user:/n', error.stack);
      return res.status(500).send({ success: false, message: error.message });
    }
  })
);

module.exports = router;
