jQuery(($) => {
    let signIn = $("#signIn");
    let inputEmail = $("#inputEmail");
    let inputPassword = $("#inputPassword");
    // let
    signIn.on("click", () => {
        let name = inputEmail.val();
        let password = inputPassword.val();
        $.ajax({
            type: "post",
            url: "http://47.106.69.157:3000/users/login",
            data: {
                name,
                password
            },
            success(res) {
                if (res.status == "success") {
                    console.log('登录成功');
                    localStorage.setItem("token", res.token);
                    location.href = "./find.html";
                } else {
                    console.log("登录失败");
                }
            }
        })
    })
});