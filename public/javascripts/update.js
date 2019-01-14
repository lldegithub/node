jQuery(($) => {
    let $user = $("#user");
    let $sex = $("#sex");
    let $hobby = $("#hobby");
    let $age = $("#age");
    let $btn = $(".btn");
    let $user2 = $("#user2");
    let $sex2 = $("#sex2");
    let $hobby2 = $("#hobby2");
    let $age2 = $("#age2");
    let img = null;

    var fileNode = document.getElementById("fileNode");
    fileNode.onchange = function () {
        // console.log(fileNode.files);
        var xmlhttp = new XMLHttpRequest();
        //设置回调，当请求的状态发生变化时，就会被调用
        xmlhttp.onreadystatechange = function () {
            //上传成功，返回的文件名，设置到父节点的背景中
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                // console.log(JSON.parse(xmlhttp.responseText));
                let data = JSON.parse(xmlhttp.responseText);
                img = data.file.filename;
            }
        };
        //构造form数据 你可以用它传输文件流 它是基于form-data的传输方案
        var data = new FormData();
        // 单图上传，默认选第一张，如果是多图的话，就要for循环遍历fileNode.files数组，并全部append到data里面传输
        data.append("abc", fileNode.files[0]);
        xmlhttp.open("post", "http://localhost:3000/file/upload", true);
        //不要缓存
        //xmlhttp.setRequestHeader("If-Modified-Since", "0");
        //提交请求
        xmlhttp.send(data);
        //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了
        // fileNode.value = null;
    };
    $btn.on("click", () => {
        let name = $user.val();
        let sex = $sex.val();
        let hobby = $hobby.val();
        let age = $age.val();
        if ((name || sex || hobby || age) == false) {
            return;
        }
        let name2 = $user2.val();
        let sex2 = $sex2.val();
        let hobby2 = $hobby2.val();
        let age2 = $age2.val();
        if ((name2 || sex2 || hobby2 || age2 || img) == false) {
            return;
        }
        let obj1 = {};
        let obj2 = {};
        if (name) {
            obj1.name = name;
        }
        if (sex) {
            obj1.sex = sex;
        }
        if (hobby) {
            obj1.hobby = hobby;
        }
        if (age) {
            obj1.age = age;
        }
        if (name2) {
            obj2.name = name2;
        }
        if (sex2) {
            obj2.sex = sex2;
        }
        if (hobby2) {
            obj2.hobby = hobby2;
        }
        if (age2) {
            obj2.age = age2;
        }
        if (img) {
            obj2.img = img;
        }
        // console.log(obj2);
        let str = JSON.stringify([obj1, obj2]);
        $.ajax({
            type: "post",
            url: "http://localhost:3000/setting/update",
            contentType: "application/json",
            // dataType: "json",
            data: str,
            success(res) {
                console.log(666);
                if (res == "修改成功") {
                    location.href = "./find.html";
                } else {
                    console.log(res);
                }
            }
        });
    })
});