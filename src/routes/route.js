const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController = require("../controllers/userController")
const BookController = require("../controllers/bookController")
const BookController2 = require("../controllers/bookcontroller2")
const Authorcontroller = require("../controllers/authorcontroller")
router.post("/createUser", UserController.createUser)

router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook)

router.get("/getBooksData", BookController.getBooksData)

router.post("/getBooks", BookController2.createBooks)
router.post("/Authors", Authorcontroller.authors)
router.get("/getAuthorId", BookController2.findid)
router.get("/getAuthorNameByBook", BookController2.findauthor)
router.get("/getbyprice", BookController2.findbyprice)

module.exports = router;