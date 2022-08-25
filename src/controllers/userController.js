const UserModel = require("../models/userModel")

const basicCode1 = async function (req, res) {
    //console.log("hey man, congrats you have reached the Handler1")
    res.send({ msg: "This is coming from controller1 (handler1)" })
}


const basicCode2 = async function (req, res) {
   // console.log("hey man, congrats you have reached the Handler2")
    res.send({ msg: "This is coming from controller2 (handler2)" })
}

const getUsersData = async function (req, res) {
    let allUsers = await UserModel.find()
    res.send({ msg: allUsers })
}

module.exports.getUsersData = getUsersData
module.exports.basicCode1 = basicCode1
module.exports.basicCode2 = basicCode2