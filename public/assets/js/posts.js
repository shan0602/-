//获取文章列表信息
$.ajax({
    url:'/posts',
    type:'get',
    success:function(resp){
        console.log(resp)
     var html=template('postsTpl',resp)
     $("#postsBox").html(html)
     var page=template('pageTpl',resp)
     $('#pageBox').html(page)
        
    }
})

//分页的分类
$.ajax({
    url:'/categories',
    type:"get",
    success:function(resp){
        var html=template('castTpl',{data:resp})
        $('#cate').html(html)
    }

})

//分页
function changePage(page){
    $.ajax({
        type: 'get',
		url: '/posts',
		data: {
			page: page
        },
        success:function(resp){
            var html=template('postsTpl',resp)
            $("#postsBox").html(html)
            var page=template('pageTpl',resp)
            $('#pageBox').html(page)

        }
    })
}


//所有状态
$("#filterForm").on('submit',function(){
    //拿到过滤的表单数据
    var  formData=$(this).serialize()
    console.log(formData);
    
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(resp){
           console.log(resp);
           
            var html=template('postsTpl',resp)
            $("#postsBox").html(html)
            var page=template('pageTpl',resp)
            $('#pageBox').html(page)
        }

    })
    return false;
})
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
//删除
$("#postsBox").on('click','.delete',function(){
   if(confirm('您确定要删除用户吗?')){
       var id=$(this).attr('data-id')
       console.log(id);
       
       $.ajax({
           type:'delete',
           url:"/posts/"+id,
           success:function(){
               location.reload()
           }
           
       })
   }
})
