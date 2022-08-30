const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (req,res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};


const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user) return res.status(404).send({status: false,msg: "Username or the Password is not corerct"});
  let token = jwt.sign(
    {userId: user._id.toString()},"secret-key");
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  userId = req.params.userId
  let userDetails = await userModel.findById(userId);
  res.send({ status: true, data: userDetails });

};

const updateUser = async function (req, res) {
  let userData = req.body.post;
  userId = req.params.userId
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {post:userData},{new:true});
  res.send({ status: true, data: updatedUser });
};

const deleteddata = async function (req, res) {
  let userData = req.body.isDeleted 
  userId = req.params.userId
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },{isDeleted:userData},{new:true});
  res.send({ status: true, data: updatedUser });
};

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteddata=deleteddata