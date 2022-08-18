const mongoose = require('mongoose')

const book = new mongoose.Schema({
    author_id:{
        type: Number,
        require:true},
    authorName:String,
    age: Number,
    address: String

})

module.exports=mongoose.model("Books",book)