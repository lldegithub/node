jQuery(($) => {
    let $user = $("#user");
    let $sex = $("#sex");
    let $hobby = $("#hobby");
    let $age = $("#age");
    let $btn = $(".btn");
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
        xmlhttp.open("post", "http://47.106.69.157:3000/file/upload", true);
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
        console.log(img);
        $.ajax({
            type: "post",
            url: "http://47.106.69.157:3000/setting/plus",
            data: {
                name,
                sex,
                hobby,
                age,
                img
            },
            success(res) {
                if (res == "插入成功") {
                    location.href = "../find.html";
                }
            }
        });
    });
});