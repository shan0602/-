function getUrl(name){
    //取到url里面的参数
    var query=location.search.substring(1).split('&')
    // console.log(query);
    if(query&&query.length>0){
        var value=-1
        query.forEach(item=>{
            var tep=item.split('=')
            // console.log(tep);
            if(name==tep[0]){
              return  value=tep[1]
                // return tep[1]
            }
       })
  
    }
    return value
  }



var id =getUrl('id')
// console.log(id);

//获取文章列表
$.ajax({
    type:"get",
    url:'/posts/category/'+id,
    success:function(data){
        console.log(data);
        var html=template('listTpl',{data:data})
        // console.log(html);
        
        $("#listBox").html(html)
    }
})

//根据分类查询信息
$.ajax({
    type:'get',
    url:'/categories/'+id,
    success:function(data){
        console.log(data);
        $("#cateTitile").html(data.title)
        
    }

})