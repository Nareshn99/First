const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)


router.get("/cowin/sessionByDistrictsid", CowinController.sessionByDistrictsid)
router.get("/weather", CowinController.londonweather)
router.get("/allcitytempdata", CowinController.allcitytempdata)
router.get("/getallmemes", CowinController.getmemes)
router.post("/makememes", CowinController.memsmaking)

module.exports = router;