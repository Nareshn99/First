const express = require('express')
const router = express.Router()
const AuthorController= require("../Controller/AuthorController")
const BlogController= require("../Controller/BlogController")
const middleware= require("../middlewares/auth")


router.post("/authors", AuthorController.createAuthor)
router.post("/login", AuthorController.authorlogin)


router.post("/createBlog",middleware.auth, BlogController.createBlog)
router.get("/filteredBlogs",middleware.auth, BlogController.getBlogs)
router.put("/blogs/:blogId",middleware.auth, BlogController.updateBlog)
router.delete("/blogsbyid/:blogId",middleware.auth, BlogController.DeleteBlog)
router.delete("/blogs",middleware.auth, BlogController.deleteByQuery)


//errorHandling for wrong address
router.all("/**", function (req, res) {         
    res.status(400).send({
        status: false,
        msg: "The api you request is not available"
    })
})
module.exports = router