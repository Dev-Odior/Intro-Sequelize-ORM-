const { Router } = require('express');
const { models } = require('../../models/index');
const requiresAuth = require('../../middleware/requiresAuth');

const JwtUtils = require('../../utils/jwt.utils');
const runAsyncWrapper = require('../../utils/runAsyncWrapper');

const router = Router();

router.post(
  '/token',
  requiresAuth('refreshToken'),
  runAsyncWrapper(async (req, res, next) => {
    const { jwt } = req.body;

    const User = models.User;
    const RefreshToken = models.RefreshToken;

    // adding includables here
    const user = await User.findOne({ where: { email: jwt.email }, include: RefreshToken });

    const savedToken = user.RefreshToken;

    if (!savedToken || !savedToken.token) {
      return res.status(401).send({ success: false, message: 'You must log in first' });
    }

    const payload = { email: user.email };
    const newAccessToken = JwtUtils.generateAccessToken(payload);
    return res.status(200).send({ success: true, data: { accessToken: newAccessToken } });
  })
);

module.exports = router;
