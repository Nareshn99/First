const authorModel = require('../models/AuthorModel')
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let body = req.body
        let {fname,lname,title,email,password}=body
        let alphabets = /^[A-Z][A-Za-z]{2,20}$/
        let passValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (Object.keys(body).length === 0) {
            return res.status(400).send({ status: false, message: "You have not provided any data" })
        }
        if (!fname) {
            return res.status(400).send({ status: false, message: "Please provide fname. it's mandatory" })
        }
        if (!alphabets.test(fname)) {
            return res.status(400).send({ status: false, message: "fname must contain only letters and first letter is capital" })
        }
        if (!lname) {
            return res.status(400).send({ status: false, message: "Please provide lname. it's mandatory" })
        }
        if (!alphabets.test(lname)) {
            return res.status(400).send({ status: false, message: "lname must contain only letters and first letter is capital" })
        }
        if (!title) {
            return res.status(400).send({ status: false, message: "Please provide title. it's mandatory" })
        }
        if (!title.match(/Mr|Miss|Mrs/)) {
            return res.status(400).send({ status: false, message: "Title can have only Mr or Miss or Mrs" })
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "Please provide email" })
        }
        if (!emailValid.test(email)) {
            return res.status(400).send({ status: false, message: "Enter valid email" })
        }
        let author = await authorModel.findOne({ email })
        if (author) {
            return res.status(409).send({ status: false, message: "this email is already exist" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "Please provide password" })
        }
        if (!passValid.test(password)) {
            return res.status(400).send({ status: false, message: "Enter valid password" })
        }
        let authorData = await authorModel.create(req.body)
        res.status(201).send({ status: true, data: authorData })
    }
    catch (err) {
        res.status(500).send({ status: false, message:err.message})
    }
}

const authorlogin = async function (req, res) {
    try {
        let useraName = req.body.email;
        let password = req.body.password;
        if (!useraName) {
            return res.status(400).send({ status: false, message: "Please provide email" })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "Please provide password" })
        }
        let authorDetails = await authorModel.findOne({ email: useraName, password: password })
        if (!authorDetails) {
            return res.status(400).send({ status: false, message: "Emaild or the password is not correct" })
        }
        let token = jwt.sign(
            {
                authorId: authorDetails._id.toString(),
                fristBlog: "the moutain"
            }, "project-1 secret key is here")
        res.setHeader('x-api-key', token)
        res.status(200).send({ status: true, data: token });
    } catch (err) {
        res.status(500).send({ status: false, message:err.message})
    }
}


module.exports.createAuthor = createAuthor
module.exports.authorlogin = authorlogin

