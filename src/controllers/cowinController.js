let axios = require("axios")
let tempModel = require("../models/tempModel")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let sessionByDistrictsid = async function (req, res) {
    try {
        let id = req.query.district_id
        let date = req.query.date
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        }
        let result = await axios(options)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let londonweather = async function (req, res) {
    try {
        let place = req.query.q
        let id = req.query.appid
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${id}`
        }
        let result = await axios(options)
        //res.status(200).send( {msg:result.data} )
        let temp = (result.data.main).temp
        let data = { city: place, temp: temp }
        let savedData = await tempModel.create(data)
        res.status(200).send(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


const allcitytempdata = async function (req, res) {
    try {
        let savedData = await tempModel.find().sort({ temp: 1 }).select({ _id: 0, __v: 0 })
        res.status(201).send({ msg: savedData })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}



let getmemes = async function (req, res) {
    try {
        let options = {
            method: 'get',
            url: 'https://api.imgflip.com/get_memes'
        }
        let result = await axios(options);
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let memsmaking = async function (req, res) {
    try {
        let username=req.query.username
        let password=req.query.password
        let id = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        // let username=req.query.username
        // let password=req.query.password

        var options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
            data1:id,data2:text0,data3:text1,data4:username,data5:password
        }
        let result = await axios(options)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.sessionByDistrictsid = sessionByDistrictsid
module.exports.londonweather = londonweather
module.exports.allcitytempdata = allcitytempdata
module.exports.getmemes = getmemes
module.exports.memsmaking=memsmaking