//随机推荐
$.ajax({
    type:'get',
    url:'/posts/random',
    success:function(data){
        // console.log(data);
        var commentTpl=` 
        {{each data}}
        <li>
        <a href="/detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}
      `
       
        // console.log(commentTpl);
        var html=template.render(commentTpl,{data:data})
        // console.log(html);
        
        $("#commentBox").html(html)
        
    }
})

function formateDate(date) {
  // 将日期时间字符串转换成日期对象
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//最新评论
$.ajax({
    type:'get',
    url:'/comments/lasted',
    success:function(data){
        // console.log(data);
        var reviewTpl=` 
        {{each data}}
        <li>
        <a href="/detail.html?id={{$value._id}}">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$value.createAt}}说:
            </p>
            <p>{{$value.title}}</p>
          </div>
        </a>
      </li>
      {{/each}}
      `
      var html=template.render(reviewTpl,{data:data})
      // console.log(html);
      $("#reviewBox").html(html)
      

    }
})

//文章分页
$.ajax({
  type:'get',
  url:'/categories',
  success:function(data){
    // console.log(data);
    var nvaTpl=`
    {{each data}}
    <li><a href="/list.html?id={{$value._id}}"><i class="fa fa-glass"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    var html=template.render(nvaTpl,{data:data})
    // console.log(html);
    
    $("#nvaBox").html(html)
  }
})
 