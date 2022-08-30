const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const mw = async function (req, res, next) {
  let token = req.headers["x-auth-token"];
  if (!token)
    return res.send({ status: false, msg: "token must be present" });

  let decodedToken = jwt.verify(token, "secret-key");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user)
    return res.send("No such user exists");

  let tokenuser = decodedToken.userId
  console.log(tokenuser,userId)
  if (tokenuser != userId) return res.send({ status: false, msg: "You do not have Authoraisation" })

  next()
}

module.exports.MW = mw