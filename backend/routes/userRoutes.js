const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register/monk', userController.registerMonk);
router.post('/register/donor', userController.registerDonor);
router.post('/login/monk', userController.loginMonk);
router.post('/login/donor', userController.loginDonor);
router.get('/donor/approval', userController.checkDonorApproval);
router.get('/getUser/:userkid/', userController.getUser);

module.exports = router;