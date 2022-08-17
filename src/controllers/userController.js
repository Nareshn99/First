const Bookmodel = require('../model/bookmodel')

const Books = async function (req, res) {
    let data = req.body
    let saveData = await Bookmodel.create(data)
    res.send({ Data: saveData })
}

const booklist = async function (req, res) {
    let bookdata = await Bookmodel.find().select({ bookName: 1, authorName: 1, _id: 0 })
    res.send({ Date: bookdata })
}

const yearlist = async function (req, res) {
    let year = req.query.year
    let selectedyear = await Bookmodel.find({ year: year })
    res.send({ Data: selectedyear })
}

const fixedbook = async function (req, res) {
    let name = req.query.name
    let year = req.query.year
    let authorName=req.query.authorName
    let bookdata = await Bookmodel.find({ bookName: name, year: year,authorName:authorName })
    res.send({ Date: bookdata })
}

const indianprice = async function (req, res) {
    let price = await Bookmodel.find({ prices: { indianPrice: "320" } })
    res.send({ Data: price })
}

const randombook = async function (req, res) {
    let random = await Bookmodel.find({
        $or: [{ stockAvailable: true }, { totalPage: { $gt: 500 } }]
    }).count()
    res.send({ Data: random })
}

module.exports.Creatbookdata = Books
module.exports.booklist = booklist
module.exports.yearlist = yearlist
module.exports.fixedbook=fixedbook
module.exports.indianprice = indianprice
module.exports.randombook = randombook