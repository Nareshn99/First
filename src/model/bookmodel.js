const mongoose=require('mongoose')

const Books=new mongoose.Schema({
    bookName : String, 
    prices: {
        indianPrice : String,
        europePrice: String,
    },
    year:{
        type:Number,
        default:2021
    },
    tags : [String],
    authorName: String, 
    totalPage:Number,
    stockAvailable: Boolean,
},{timestage:true})

module.exports=mongoose.model('User',Books)