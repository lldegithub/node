var express = require('express');
var router = express.Router();

let {
    find,
    insert,
    update,
    del
} = require("../libs/mongo.js");

/* GET home page. */

router.get('/update', function (req, res, next) {
    res.send('update');
});

//增
router.post('/plus', (req, res, next) => {
    // res.send("hello");
    let {
        name,
        sex,
        hobby,
        age,
        img
    } = req.body;
    insert("week", [{
        name,
        sex,
        hobby,
        age,
        img
    }]).then((result) => {
        res.send(result);
    });
});

//改
router.post('/update', (req, res, next) => {
    let arr = req.body;
    // let arr = JSON.parse(obj);
    // console.log(arr);
    // let str = arr[0];
    // obj = obj.slice(0,-3);
    let obj1 = arr[0];
    let obj2 = arr[1];
    // res.send(obj2);
    // update("week",obj1,obj2);
    // console.log(obj1,obj2);
    update("week", obj1, obj2).then((result) => {
        res.send(result);
    });
});

//删
router.post('/delete', (req, res, next) => {
    let obj = req.body;
    // console.log(obj);
    // res.send(obj);
    del("week", obj).then((result) => {
        res.send(result);
    });
});

module.exports = router;
