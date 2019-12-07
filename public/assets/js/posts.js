//获取文章列表信息
$.ajax({
    url:'/posts',
    type:'get',
    success:function(resp){
        console.log(resp)
     var html=template('postsTpl',{data:resp})
     $("#postsBox").html(html)
        
    }
})