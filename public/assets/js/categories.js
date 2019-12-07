$("#addForm").on('submit',function(){
    var formData=$(this).serialize()
    // console.log(formData);
    
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(){
            location.reload()
        }

    })
    return false;
})


//展示列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(resp){
        // location.reload()
        console.log(resp);
        
      var html=template('categoriesTpl',{categories:resp})
      $("#categoriesBox").html(html)

    }

})
//按钮添加点击事件
$("#categoriesBox").on('click','.edit',function(){
 
    var id =$(this).attr('data-id')
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
   
        success:function(data){
            console.log(data);
            
        var html=template('modifycateTpl',data)
        $('#formBox').html(html)
        }

    })
   

    
})
//当修改之后表单发生的提交行为
$("#formBox").on('submit','#modifyCategory',function(){
    //拿到表单里面输入的内容
    var formData=$(this).serialize()
    //要修改的id
    var id =$(this).attr('data-id')
    $.ajax({
        type:'put',
        url: '/categories/' + id,
        data:formData,
        success:function(){
            //重新修改,刷新页面
            location.reload()
        }
    })
})
//删除用户
$("#categoriesBox").on('click','.delete',function(){
   if(confirm('您确定要删除用户吗?')){
        //获取id
    var id =$(this).attr('data-id')
    console.log(id);
    $.ajax({
        type: 'delete',
        url: '/categories/' + id,
        success:function(){
            location.reload()
        }
        

    })
    
   }

})
