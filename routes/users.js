var express = require('express');
var router = express.Router();
var token = require("../libs/token.js");

let {
    find,
    insert,
    del,
    update
} = require("../libs/mongo.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('users');
});

// 登录路由
router.post("/login", async (req, res, next) => {
    // res.send("666");
    let {
        name,
        password
    } = req.body;
    let data = await find("login", {
        name
    });
    if (data[0]) {
        if (data[0].password == password) {
            res.send({
                status: "success",
                token: token.createToken({
                    name,
                    password
                }, 60)
            });
        } else {
            res.send({
                status: "fail"
            });
        }
    } else {
        res.send("fail");
    }
});

// 所有数据的路由
router.get("/getUsers", async (req, res, next) => {
    let obj = req.body;
    let data = await find("week", {
        ...obj
    });
    res.send(data);
});

router.post("/autoLogin", async (req, res, next) => {
    res.send({
        status: token.checkToken(req.headers.token)
    });
});

module.exports = router;
