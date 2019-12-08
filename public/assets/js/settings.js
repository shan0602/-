//获取图片
$("#logo").on('change',function(){
    var file=this.files[0]
    console.log(file);
     var formDate=new FormData()
     formDate.append('logo',file)
     $.ajax({
         type:'post',
         url:'/upload',
         data:formDate,
         processData: false,
         contentType: false,
         success:function(resp){
             console.log(resp);
             
            $("#logonHidden").val(resp[0].logo)
            //显示在页面上
            $("#preview").attr('src',resp[0].logo)
         }

     })

    //  return false;
})



function serializeObj(form) {
    let arr = form.serializeArray()
    let obj = {}
    arr.forEach((item) => {
        obj[item.name] = item.value

    });
    return obj
}

//向表单提交行为
$("#settingBox").on('submit',function(){
 
    //拿到提交的数据
    var formDate=serializeObj($(this))
    console.log(formDate);
   formDate.comment=formDate.comment=='on'?'true':'false'
   formDate.review=formDate.review=='on'?'true':'false'
   console.log(review);
   
   
    console.log(comment);
    
    $.ajax({
        type:'post',
        url:'/settings',
        data:formDate,
        success:function(resp){
            console.log(resp);
            location.reload()

        }
    })
return false;
})

//向服务端发送请求,索要网站的数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(data){
        console.log(data);
        if(data){
            
        }
        
    }

})