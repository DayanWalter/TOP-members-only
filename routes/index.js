const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');
/* GET home page. */
router.get('/', user_controller.index);
// GET Signup
router.get('/signup', user_controller.sign_up_get);
//POST Signup
router.post('/signup', user_controller.sign_up_post);

module.exports = router;
