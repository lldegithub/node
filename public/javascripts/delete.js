jQuery(($) => {
    let $name = $("#user");
    let $sex = $("#sex");
    let $hobby = $("#hobby");
    let $age = $("#age");
    let btn = $(".btn");
    btn.on("click", () => {
        let name = $name.val();
        let sex = $sex.val();
        let hobby = $hobby.val();
        let age = $age.val();
        if(!(name || sex || hobby || age)){
            return ;
        }
        let obj = {};
        if (name) {
            obj.name = name;
        }
        if (sex) {
            obj.sex = sex;
        }
        if (hobby) {
            obj.hobby = hobby;
        }
        if (age) {
            obj.age = age;
        }
        $.ajax({
            type: "post",
            url: "http://47.106.69.157:3000/setting/delete",
            data: obj,
            success(res) {
                if (res == "删除成功") {
                    location.href = "./find.html";
                } else {
                    console.log(res);
                }
            }
        });
    })
});