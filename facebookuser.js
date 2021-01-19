const express = require("express");
const router = express.Router();

const fbUserController = require('../controllers/facebookuser');
const checkAuth = require('../middleware/check-auth');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post("/fbuser/signup", fbUserController.fbuser_signup);

// router.post("/login", upload.none(), UserController.fbuser_login);




module.exports = router;
