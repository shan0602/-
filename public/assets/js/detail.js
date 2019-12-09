console.log(1);

//获取文章的的详情信息页面
//先要获取他的url里面id
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

  var id=getUrl('id')
  console.log(id);
  
$.ajax({
    type:'get',
    url:'/posts/'+id,
    success:function(data){
        console.log(data);
        
        var html=template('contentTpl',data)
    console.log(html);
    
        $("#contentBox").html(html)
    }
})