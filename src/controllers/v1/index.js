const { Router } = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');
const tokenRouter = require('./token');

const router = Router();

router.use(registerRouter);
router.use(loginRouter);
router.use(tokenRouter);

module.exports = router;
