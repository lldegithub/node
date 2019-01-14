jQuery(($) => {
    (async () => {
        let fn = {
            true: async () => {
                let data = await fn.getUserList();
                let list = $(".list");
                let str = "";
                str += data.map((item) => {
                    return `<tr>
                        <td>${item._id}</td>
                        <td>
                            <img src="${item.img}" style="width:30px;height:30px;">
                        </td>
                        <td>${item.name}</td>
                        <td>${item.sex}</td>
                        <td>${item.hobby}</td>
                        <td>${item.age}</td>
                    </tr>`;
                }).join("");
                list.html(str);
            },
            false() {
                location.href = "login.html";
            },
            getUserList() {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "get",
                        url: "http://localhost:3000/users/getUsers",
                        data: {},
                        success(res) {
                            resolve(res);
                        }
                    });
                })
            },
            autoLogin() {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "post",
                        headers: {
                            token: localStorage.getItem("token")
                        },
                        url: "http://localhost:3000/users/autoLogin",
                        success(data) {
                            resolve(data);
                        }
                    })
                })
            }
        };
        let isLogin = await fn.autoLogin();
        fn[isLogin.status]();
    })();
    // 校验token
    // let token = localStorage.getItem("token");

    // let list = $(".list");
    // let listRendar = (arr) => {
    //     let str = "";
    //     str += arr.map((item) => {
    //         return `<tr>
    //                     <td>${item._id}</td>
    //                     <td>
    //                         <img src="${item.img}" style="width:30px;height:30px;">
    //                     </td>
    //                     <td>${item.name}</td>
    //                     <td>${item.sex}</td>
    //                     <td>${item.hobby}</td>
    //                     <td>${item.age}</td>
    //                 </tr>`;
    //     }).join("");
    //     list.html(str);
    // };

    // $.ajax({
    //     type: "get",
    //     url: "http://localhost:3000/users/getUsers",
    //     data: {},
    //     success(res) {
    //         listRendar(res);
    //     }
    // });
});