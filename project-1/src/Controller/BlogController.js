const authorModel = require("../models/AuthorModel")
const blogModel = require("../models/BlogModel")
const mongoose = require('mongoose');



const createBlog = async function (req, res) {
    try {
        let blog = req.body
        //validation for title
        if (!blog.title) {
            return res.status(400).send({ status: false, msg: "provide blog title. it's mandatory" })
        }
        if (!/^[A-Z][A-Z a-z-]{2,30}$/.test(blog.title)) {
            return res.status(400).send({ status: false, msg: "blog title contains only string form with first Capital latter" })
        }
        let checktitle = await blogModel.findOne({ title: blog.title })
        if (checktitle) {
            return res.status(400).send({ status: false, msg: "this title is already reserved" })
        }
        //validation for body
        if (!blog.body) {
            return res.status(400).send({ status: false, msg: "provide blog body. it's mandatory" })
        }
        if (!/^[A-Z][A-Z a-z-]{2,20000}$/.test(blog.body)) {
            return res.status(400).send({ status: false, msg: "blog body contains only string form" })
        }
        //validation for authorId
        if (!blog.authorId) {
            return res.status(400).send({ status: false, msg: "Please provide authorId. it's mandatory" })
        }
        if (!mongoose.Types.ObjectId.isValid(blog.authorId)) {
            return res.status(400).send({ status: false, msg: "AuthorId is not valid,please enter valid ID" })
        }
        let authorbyid = await authorModel.findById(blog.authorId)
        if (!authorbyid) {
            return res.status(400).send({ status: false, msg: "Author is not exist" })
        }
        //validation for category
        if (!blog.category) {
            return res.status(400).send({ status: false, msg: "please enter your blog category. it's mandatory" })
        }
        //validation for isPublished
        if (blog.isPublished) {
            if (typeof (blog.isPublished) !== "boolean") {
                return res.status(400).send({ status: false, msg: "contains only boolean value in isPablished" })
            }
            if (blog.isPublished == true) { blog["publishedAt"] = Date.now() }
        }
        //validation for isDeleted
        if (blog.isDeleted) {
            if (typeof (blog.isDeleted) !== "boolean") {
                return res.status(400).send({ status: false, msg: "contains only boolean value in isDeleted" })
            }
            if (blog.isDeleted == true) { blog["deletedAt"] = Date.now() }
        }
        //blog creation
        let blogCreated = await blogModel.create(blog)
        res.status(201).send({ status: true, Data: blogCreated })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}



const getBlogs = async function (req, res) {
    try {
        let temp = req.query
        temp.isDeleted = false
        temp.isPublished = true

        if (temp.tags) {
            let tagsall = temp.tags.trim().split(",").map(tags => tags.trim())
            temp["tags"] = { $all: tagsall }
        }

        if (temp.category) {
            let categorysall = temp.category.trim().split(",").map(category => category.trim())
            temp["category"] = { $all: categorysall }
        }

        if (temp.subcategory) {
            let subcategorysall = temp.subcategory.trim().split(",").map(subcategory => subcategory.trim())
            temp["subcategory"] = { $all: subcategorysall }
        }

        let BlogsWithCond = await blogModel.find(temp)
        if (BlogsWithCond.length === 0) {
            return res.status(400).send({ status: false, msg: `blog not found` })
        }
        res.status(200).send({ status: true, data: BlogsWithCond })
    }
    catch (error) {
        res.status(500).send({ error: error })
    }
}



const updateblog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        //validation for Blog Id
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).send({ status: false, msg: "BlogId is not valid,please enter valid ID" })
        }
        let blog = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!blog) {
            return res.status(404).send({ status: false, msg: "Blog is not found for this ID" })
        }
        //Authorization
        if (req.pass.authorId !== blog.authorId.toString()) {
            return res.status(403).send({ status: false, msg: "you are not authorised for this opretion" })
        }

        let data = req.body;
        //validation for title
        if (data.title == "") { return res.status(400).send({ status: false, msg: "blog title is empty" }) }
        if (data.title) {
            if (!/^[A-Z a-z- 0-9]{8,30}$/.test(data.title)) return res.status(400).send({ status: false, msg: "title must contain only letters and first letter is capital" })
        }
        //validation for body
        if (data.body == "") { return res.status(400).send({ status: false, msg: "blog body is empty" }) }
        if (data.body) {
            if (!/^[A-Z a-z 0-9]{10,20000}$/.test(data.body)) return res.status(400).send({ status: false, msg: "title must contain only letters and first letter is capital" })
        }
        //updateblog
        let updateblog = await blogModel.findOneAndUpdate(
            { _id: blogId },
            { $set: { title: data.title, body: data.body, isPublished: true, publishedAt: new Date() }, $push: { tags: data.tags, subcategory: data.subcategory } },
            { new: true })
        res.status(200).send({ status: true, message: "successfully updated", data: updateblog })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}



const DeleteBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        //validation for Blog Id
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).send({ status: false, msg: "BlogId is not valid,please enter valid ID" })
        }
        let blog = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!blog) return res.status(404).send({ msg: "Blog is not found for this ID" })
        //Authorization
        if (req.pass.authorId !== blog.authorId.toString()) {
            return res.status(403).send({ status: false, msg: "you are not authorised for this opretion" })
        }
        //Deletetions
        await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } })
        res.status(200).send({ status: true, message: `blog successfully deleted` })

    } catch (err) {
        res.status(500).send(err.message)
    }
}

const deleteByQuery = async function (req, res) {
    try {
        let cond = req.query
        //Authorization
        let blog = await blogModel.find({ authorId: req.pass.authorId, isDeleted: false })
        if (blog.length==0) {
            return res.status(404).send({ status: false, msg: "you don't have any Blog" })
        }
        if (cond.tags) {
            let tagsall = cond.tags.trim().split(",").map(tags => tags.trim())
            cond["tags"] = { $all: tagsall }
        }

        if (cond.category) {
            let categorysall = cond.category.trim().split(",").map(category => category.trim())
            cond["category"] = { $all: categorysall }
        }

        if (cond.subcategory) {
            let subcategorysall = cond.subcategory.trim().split(",").map(subcategory => subcategory.trim())
            cond["subcategory"] = { $all: subcategorysall }
        }
        //Deletetion
        let deleted = await blogModel.updateMany(cond, { $set: { isDeleted: true } })
        let temp = deleted.modifiedCount.toString()
        res.status(200).send({ status: true, msg: `${temp} blogs deleted` })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateblog
module.exports.DeleteBlog = DeleteBlog
module.exports.deleteByQuery = deleteByQuery