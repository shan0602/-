$('#passwordForm').on('submit', function () {
	// 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // console.log(formData);
    
	// 调用接口 实现密码修改功能
	$.ajax({
		url: '/users/password',
		type: 'put',
		data: formData,
		success: function () {
            //转跳到登录页面
            location.href = "/admin/login.html"
            // console.log();
            
        },
       
        
	})
	// 阻止表单默认提交的行为
	return false;
});