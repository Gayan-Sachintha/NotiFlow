const express = require('express');
const templeController = require('../controllers/templeController');

const router = express.Router();

router.get('/', templeController.getAllTemples);
router.post('/getAllTemplesId', templeController.getAllTemplesId);
router.get('/getAllTemplesRequests', templeController.getAllTemplesRequests);
router.get('/getApprovedTemples', templeController.getApprovedTemples);
router.get('/getAllTemplesApproved', templeController.getAllTemplesApproved);
router.get('/getAllTemplesBlocked', templeController.getAllTemplesBlocked);
router.post('/createTemple', templeController.createTemple);
// router.post('/updateTemple-old', templeController.updateTemple);
router.post('/updateTemple/:templeId', templeController.updateTemple2);
router.get('/getMonkTemple/:monkid/:data', templeController.getMonkTemple);

router.post('/assign/donor', templeController.assignDonor);
router.get('/monkReserveCalendar/:templeID', templeController.monkReserveCalendar);
router.post('/approveTemple/:id', templeController.approveTemple);
router.post('/removeTemple/:id', templeController.removeTemple);
router.post('/unblockTemple/:id', templeController.unblockTemple);

module.exports = router;