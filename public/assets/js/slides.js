// console.log(1);

$("#file").on('change',function(){
    //获取到当前用户选择的图片
    var upload=this.files[0]
    // console.log(upload);
    var formDate=new FormData()
    formDate.append('image',upload)
    //向服务器发送请求
    $.ajax({
        type:'post',
        url:'/upload',
        data:formDate,
        processData: false,
		contentType: false,
        success:function(resp){
            // console.log();
            console.log(resp);
            
            // console.log(1);
            $('#image').val(resp[0].image)
            

            
        }
    })
})
//当轮播发生提交的时候
$("#addForm").on('submit',function(){
    //获取表单的内容
    var formDate=$(this).serialize()
    console.log(formDate);
    
    $.ajax({
        type:'post',
        url:'/slides',
        data:formDate,
        success:function(){
            location.reload()
        }
    })

return false;


    
})

//渲染页面
$.ajax({
    type:'get',
    url:'/slides',
    success:function(data){
        console.log(data);
        
        var html=template('slidesTpl',{data:data})
        $("#slidesBox").html(html)
    }
})
//删除
$("#slidesBox").on('click','.delete',function(){
  if(confirm('您确定要删除吗?')){
    var id=$(this).attr('data-id')
    console.log(id);
    
    $.ajax({
        type:'delete',
        url:'/slides/'+id,
        success:function(data){
            location.reload()
        }

    })
  }
})