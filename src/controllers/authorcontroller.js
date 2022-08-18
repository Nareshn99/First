const authormodel= require("../models/authormodel")

const Authors= async function (req, res) {
    let data= req.body
    let savedData= await authormodel.create(data)
    res.send({msg: savedData})
}

module.exports.authors= Authors