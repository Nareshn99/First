const bookmodel2 = require("../models/bookmodel2")
const authormodel = require("../models/authormodel")


const createBooks = async function (req, res) {
    let data = req.body
    let savedData = await bookmodel2.create(data)
    res.send({ msg: savedData })
}

const findid = async function (req, res) {
    let data = req.query.authorName
    let saveid = await bookmodel2.findOne({ authorName: data })
    let savedData = await authormodel.find({ author_id: saveid.author_id }).select({ Name: 1, _id: 0 })
    res.send({ msg: savedData })
}

const findauthor = async function (req, res) {
    let bookname = req.query.bookname
    let savebookname = await authormodel.findOneAndUpdate({ Name: bookname, price: 100}).select({ author_id: 1, price: 1, _id: 0 })
    let saveandupdate = await bookmodel2.findOne({ author_id: savebookname.author_id }).select({ authorName: 1, _id: 0 })
    res.send({ msg: savebookname + saveandupdate })
}

const findbyprice = async function (req, res) {
    let gte = req.query.gte
    let lte = req.query.lte
    let saveprice = await authormodel.find({ price: { $gte: gte, $lte: lte } }).select({ author_id: 1, Name: 1, _id: 0 })
    let x=saveprice.map(element=> element.author_id )
        let saveData = await bookmodel2.find({ author_id:x }).select({ authorName: 1, _id: 0 })
        res.send({ msg: saveData })
}
    //console.log(saveData)
    
    //((saveprice.author_id )=>{console.log(saveprice.author_id)})
    //console.log(b)
    // for(i=0;i<saveprice.length;i++){
    //     let a=saveprice[i].author_id
    //let saveData = await bookmodel2.find({author_id:x}).select({ authorName: 1, _id: 0 })
    // //let m=saveprice.map(a=>a==author_id )//
    //console.log(saveData)
    // }
    //res.send({ msg: saveprice})


module.exports.createBooks = createBooks
module.exports.findid = findid
module.exports.findauthor = findauthor
module.exports.findbyprice = findbyprice