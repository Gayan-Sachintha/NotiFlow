const express = require('express');
const monkController = require('../controllers/monkController');

const router = express.Router();

 
router.get('/get-donor', monkController.getDonor);
router.get('/calenderdata', monkController.calenderdata);
router.post('/change-donor-status', monkController.changeDonorStatus);
router.post('/changeDonorStatus', monkController.changeDonorStatus);
router.get('/getDonorsByTemple/:templeID', monkController.getDonorsByTemple);
router.get('/getBlockedDonorsByTemple/:templeID', monkController.getBlockedDonorsByTemple);
router.get('/getRequestsDonorsByTemple/:templeID', monkController.getRequestsDonorsByTemple);
router.get('/getMealsForCalendar', monkController.getMealsForCalendar);
router.get('/getDonorsForTemple/:templeId', monkController.getDonorsForTemple);
router.get('/getSpecialRes/:templeId', monkController.getSpecialRes);
router.get('/getMonkTemple/:templeId', monkController.getDonorsForTemple);
router.post('/updateMealDonor', monkController.updateMealDonor);
router.post('/removeMealDonor', monkController.removeMealDonor);
router.post('/requestSpecialRes', monkController.requestSpecialRes);
router.post('/approveSpecialRes', monkController.approveSpecialRes);


module.exports = router;
