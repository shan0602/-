function serializeObj(form) {
    let arr = form.serializeArray()
    let obj = {}
    arr.forEach((item) => {
        obj[item.name] = item.value

    });
    return obj
}



$('#userForm').on('submit', function () {
    // let userForm=$(this).serialize().spile('&')
    // console.log(userForm);

    let data = serializeObj($(this))
    console.log(data);
    $.ajax({
        type: 'POST',
        url: '/users',
        data,
        success: function (data) {
            //刷新页面
            location.reload()
        },
        error: function (err) {
            alert('用户输入错误')
        }
    })
    //阻止执行
    return false;
})


//处理文件上传的功能
$('#avatar').on('change', function () {
    var formData = new FormData()
    //添加到

    formData.append('avatar', this.files[0])
    //   console.log(this.files[0]);

    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        //让文件不识别他的类型
        contentType: false,
        //不要解析参数
        processData: false,
        success: function (resp) {
            console.log(resp);
            //拿到图片的地址
            let url = resp[0].avatar
            console.log(url);

            $('#imgInput').attr('src', url)
            $('#hidden').val(url)
        },
        error: function () {
            alert('文件上传错误')
        }


    })
})


//渲染页面
$.ajax({
    type: 'get',
    url: '/users',
    success: function (data) {
        let html = template('userTpl', {
            data: data
        })
        $('#userBox').html(html)
    }
})


//修改用户信息

$("#userBox").on('click', '.edit', function () {
    //获取id
    var id = $(this).attr('data-id')
    //   console.log(id);

    //请求数据
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (data) {
            console.log(data);

            var html = template('modifyTpl', data)
            // console.log(html);

            $("#modifyBox").html(html)
        }

    })

})

$("#modifyBox").on('submit', '#modifyForm', function () {

    var id = $(this).attr('data-id')
    console.log(id);

    var formData = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (resp) {
            console.log(resp);

            location.reload()
        }

    })

    return false

})
//删除用户


//修改用户信息

$("#userBox").on('click', '.delete', function () {
    if (confirm('您确定要删除这个用户吗?')) {
        //获取id
        var id = $(this).attr('data-id')
        console.log(id);

        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (data) {
                location.reload()
            }
        })
    }

})
//全选状态

$("#selectAll").on('change', function () {
    console.log(12);
    
        //获取他的状态
        var checkedUser = $(this).prop('checked')
        console.log(checkedUser);
        
        //获取批量生产的按钮
        // var deleteMany=$("#deleteMany")
        //显示按钮
        if (checkedUser) {
            $("#deleteMany").show()
        } else {
            $("#deleteMany").hide()
        }
        //获取到所有的用户并将用户的状态和全选按钮保持一致
        $("#userBox").find('input').prop('checked', checkedUser)



    }

)
//当复选框状态没有发生改变时
$("#userBox").on('change', '.userStatus', function () {
    //获取里面的所有的复选框下的input
    //var input=$("#userBox").find('input')
    // var deleteMany=$("#deleteMany")
    //判断里面的数量是否一致
    if ($("#userBox").find('input').length == $("#userBox").find('input:checked').length) {
        $("#selectAll").prop('checked', true)
    } else {
        $("#selectAll").prop('checked', false)
    }
    //如果复选框里面的数量等于0 就让他隐藏
    if ($("#userBox").find('input:checked').length == 0) {
        $("#deleteMany").hide()
    } else {
        $("#deleteMany").show()
    }


})
//点击删除
$("#deleteMany").on('click', function () {
    //添加一个放id的容器
    var id = [];
    //获取选中用户的状态
    var checkedUser = $("#userBox").find('input:checked')
    //循环复选框,获取id
    checkedUser.each(function (index, item) {
        id.push($(item).attr('data-id'))

    })
    if (confirm('您确定要进行批量删除操作')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id.join('-'),
            success: function () {
                location.reload();
            }
        })
    }
})