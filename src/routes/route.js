const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr = [1, 2, 3,4, 5, 6, 7,9,10]
    let m = ((arr.length + 1) * ((arr.length + 1) + 1) / 2);
    let a = 0;

    for (let i = 0; i < arr.length; i++) {
        a = a + arr[i];
    }

    let missingNumber = m - a;

    res.send({ "Your Missing Number is ": missingNumber });
});
router.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr = [33, 34, 35,36, 37, 38,39,41]
    let m = ((arr.length + 1) * ((arr[0]) + arr[arr.length - 1]) / 2);
    let a = 0;

    for (let i = 0; i < arr.length; i++) {
        a = a + arr[i];
    }

    let missingNumber = m - a;

    res.send({ "Your Missing Number is ": missingNumber });
});



module.exports = router;