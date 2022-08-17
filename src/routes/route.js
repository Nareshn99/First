const express = require('express');
const router = express.Router();
//const UserModel= require("../books/bookSchama")
const UserController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createbookdata", UserController.Creatbookdata)
router.get("/booklist", UserController.booklist)
router.get("/getBooksInYear", UserController.yearlist)
router.get("/getPerticularBook", UserController.fixedbook)
router.get("/getXINRBooks", UserController.indianprice)
router.get("/getRandomBooks", UserController.randombook)

module.exports = router;