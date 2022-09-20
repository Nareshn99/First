const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname: {
        type:String,
        required:true,
        trim:true
    },
    title: {
        type:String,
        required:true, 
        enum:["Mr", "Mrs", "Miss"]
    },
    email: {
        type:String,
        required:true,
        trim:true,
        lowerrcase:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        
    },
    password: {
        type:String,
        required:true,
        trim:true
    } 

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)