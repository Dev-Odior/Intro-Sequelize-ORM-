const { Router } = require('express');
const registerRouter = require('./register');

const router = Router();

router.use(registerRouter);

export default router;
