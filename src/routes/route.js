const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")



router.get("/getUsersData",UserController.getUsersData)

router.get("/basicRoute1",UserController.basicCode1)

router.get("/basicRoute2",UserController.basicCode2)

module.exports = router;