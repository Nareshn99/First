const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mw=require("../commonMW/auth")

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId",mw.MW, userController.getUserData)

router.put("/users/:userId",mw.MW, userController.updateUser)

router.delete("/users/:userId",mw.MW, userController.deleteddata)

module.exports = router;