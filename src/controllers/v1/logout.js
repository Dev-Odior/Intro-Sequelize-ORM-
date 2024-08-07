const { Router } = require('express');
const { models } = require('../../models/index');

const requiresAuth = require('../../middleware/requiresAuth');
const runAsyncWrapper = require('../../utils/runAsyncWrapper');

const router = Router();

router.post(
  '/logout',
  runAsyncWrapper(async (req, res, next) => {
    const User = models.User;
    const Role = models.Role;
    const RefreshToken = models.RefreshToken;

    const { jwt } = req.body;
    const user = await User.findOne({ where: { email: jwt.email }, include: RefreshToken });

    user.RefreshToken.token = null;
    user.RefreshToken.save();

    return res.status(200).send({ success: true, message: 'Successfully logged out' });
  })
);

module.exports = router;
