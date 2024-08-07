const { Router } = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');
const tokenRouter = require('./token');
const logoutRouter = require('./logout');

const router = Router();

router.use(registerRouter);
router.use(loginRouter);
router.use(tokenRouter);
router.use(logoutRouter);

module.exports = router;
