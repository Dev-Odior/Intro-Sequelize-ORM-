const { Router } = require('express');
const registerRouter = require('./register');
const loginRouter = require('./login');

const router = Router();

router.use(registerRouter);
router.use(loginRouter);

module.exports = router;
