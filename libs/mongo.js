const {
    MongoClient
} = require("mongodb");

const url = "mongodb://localhost:27017";

const dbname = "node";

// 连接mongodb
let connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                reject(err);
            } else {
                console.log("Connection Successfull to server");
                const db = client.db(dbname);
                resolve({
                    db,
                    client
                });
            }
        });
    });
};

// 增
let insert = (col, arr) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.insertMany(arr, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve("插入成功");
                client.close();
            }
        })
    })
};

//删
let del = (col, obj) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.deleteMany(obj, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve("删除成功");
                client.close();
            }
        })
    })
};

//查
let find = (col, obj) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.find({
            ...obj
        }).toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
                client.close();
            }
        })
    })
};

//改
let update = (col, obj1, obj2) => {
    return new Promise(async (resolve, reject) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.update({
            ...obj1
        }, {
            $set: {
                ...obj2
            }
        }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve("修改成功");
                client.close();
            }
        })
    })
};

module.exports = {
    insert,
    del,
    find,
    update
};