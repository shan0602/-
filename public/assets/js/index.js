$("#logout").on('click', function () {
    //做一个确认,如果是true的话就让他转跳到登录页面
    var isConfirm = confirm('确认要退出登录吗?')
    if (isConfirm) {
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function (data) {
          location.href = '/admin/login.html'

        },
        error: function () {
          alert('退出失败')
        }
      })
    }
  })

  //获取评论的数量
  $.ajax({
      type:'get',
      url:'/comments/count',
      success:function(data){
        // console.log(data);
        $('#commentCount').html('<strong>'+data.commentCount+'</strong>条评论')

      }
  })
  //查询文章数量
  $.ajax({
      type:'get',
      url:'/posts/count',
      success:function(data){
        console.log(data);
        $("#post").html('<strong>'+data.postCount+'</strong>篇文章（<strong>'+data.draftCount+'</strong>篇草稿）')
        
      }
  })
  //查询分类的数量
  $.ajax({
      type:'get',
      url:'/categories/count',
      success:function(data){
          console.log(data);
          $("#classCount").html('<strong>'+data.categoryCount+'</strong>个分类')
          

      }
  })