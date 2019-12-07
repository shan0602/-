//获取文章的分页的数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        // console.log(data);
        //进行模板拼接
        var html = template('categoryTpl', {
            data: data
        })
        //   console.log(html);
        console.log(1);

        $("#category").html(html)
    }
})

//文件上传 
$("#feature").on('change', function () {
    //获取他要上传的文件 
    var file = this.files[0]
    //创建一个对象
    var formData = new FormData()
    //在formData里面添加封面和要上传的文件
    formData.append('cover', file)
    console.log(2);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function (resp) {
            // console.log(resp);
            $("#thumbnail").val(resp[0].cover)
        }


    })

})
//添加文件上传提交
function serializeObj(form) {
    let arr = form.serializeArray()
    let obj = {}
    arr.forEach((item) => {
        obj[item.name] = item.value

    });
    return obj
}

$("#addForm").on('submit', function () {
    var formData = serializeObj($(this))
    console.log(3,formData);

    console.log(formData);
    $.ajax({
        url: '/posts',
        type: 'post',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
            console.log(1);

        },
        error: function () {
            alert('出错了')
        }
    })
    //阻止表单提交的默认事件
    return false;

})
//