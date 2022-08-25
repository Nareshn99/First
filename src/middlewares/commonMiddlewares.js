
const mid1= function ( req, res, next) {
    console.log (new Date(),",",req.ip);
    next();
}
module.exports.mid1= mid1
