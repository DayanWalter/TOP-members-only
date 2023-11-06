const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');
/* GET home page. */
router.get('/', user_controller.index);

module.exports = router;
