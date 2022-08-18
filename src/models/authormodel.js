const mongoose = require('mongoose')

const author = new mongoose.Schema({
    Name: String,
    author_id:{
        type:Number,
        require:true},
    price: Number,
    ratings:Number

})

module.exports=mongoose.model("Author",author)