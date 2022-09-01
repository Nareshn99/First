const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema( {
    city: String,
    temp: Number
})

module.exports = mongoose.model('Temp', tempSchema)