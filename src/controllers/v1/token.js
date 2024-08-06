const { Router } = require('express');
const { models } = require('../../models/index');

const JwtUtils = require('../../utils/jwt.utils');
const runAsyncWrapper = require('../../utils/runAsyncWrapper');

const router = Router();

router.post(
  '/token',
  runAsyncWrapper(async (req, res, next) => {
    const { jwt } = req.body;

    const User = models.User;

    try {
      const user = await User.findOne({ where: { email: jwt.email }, include: RefreshToken });

      const savedToken = user.RefreshToken;

      if (!savedToken || !savedToken.token) {
        return res.status(401).send({ success: false, message: 'You must log in first' });
      }

      const payload = { email: user.email };
      const newAccessToken = JwtUtils.generateAccessToken(payload);
      return res.status(200).send({ success: true, data: { accessToken: newAccessToken } });
    } catch (error) {}
  })
);

module.exports = router;
