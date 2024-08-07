const { Router } = require('express');
const { models } = require('../../models/index');

const JwtUtils = require('../../utils/jwt.utils');
const runAsyncWrapper = require('../../utils/runAsyncWrapper');

const router = Router();

router.post(
  '/login',
  runAsyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    const User = models.User;

    const user = await User.findOne({ where: { email } });

    // when we use the include for the includables thingy that is eager loading
    if (!user || !(await User.comparePasswords(password, user.password))) {
      return res.status(401).send({ success: false, message: 'invalid credentials' });
    }

    const payload = { email };
    const accessToken = JwtUtils.generateAccessToken(payload);

    // Handle refresh token
    let refreshToken;
    const savedRefreshToken = await user.getRefreshToken();

    if (!savedRefreshToken || !savedRefreshToken.token) {
      refreshToken = JwtUtils.generateRefreshToken(payload);

      if (!savedRefreshToken) {
        // This is the association mixins thing
        await user.createRefreshToken({ token: refreshToken });
      } else {
        console.log(savedRefreshToken, 'this is the user');
        savedRefreshToken.token = refreshToken;
        await savedRefreshToken.save();
      }
    } else {
      refreshToken = savedRefreshToken.token;
    }

    return res
      .status(200)
      .send({ send: true, message: 'Successfully logged in ', data: { accessToken, refreshToken } });
  })
);

module.exports = router;
