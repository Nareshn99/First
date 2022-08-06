
let date = function () {
    var today = new Date();
    var dd = today.getDate()
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    console.log("Today Date is ", dd,"/",mm,"/",yyyy)
}
let getBatchInfo=function(){
     console.log("Plutonium, W3D5, the topic for today is Nodejs module system");
    
}

module.exports.date = date
module.exports.getBatchInfo=getBatchInfo