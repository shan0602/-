//获取评论
$.ajax({
    url:'/comments',
    type:'get',
    success:function(data){
    console.log(data);
        var html=template('contentTpl',data)
        // console.log(html);
        
        $('#contentBox').html(html)

    }
})
//审核状态
$("#contentBox").on('click','.status',function(){
    //获取当前的状态
    var status=$(this).attr('data-status')
    console.log(status);
    
    //获取id
    var id=$(this).attr('data-id')
    console.log(id);
    
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data:{
            state:status==0 ? 1 : 0
        },
        success:function(){
            location.reload()
        }
    })
})




// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
  


//点击删除按钮删除评论
$("#contentBox").on('click','.delete',function(){
   if(confirm('您确定要删除用户吗?')){
        //获取id的值
    var id=$(this).attr('data-id')
    console.log(id);
    $.ajax({
        type:'delete',
        url:'/comments/'+id,
        success:function(){
            location.reload()
        }
    })
   }
})    