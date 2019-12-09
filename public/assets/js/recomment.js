

// console.log(1);
//热门推荐
$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(data){
        console.log(data);
        var recommendTpl=`
        {{each data}}
      
        <li>
            <a href="/detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
          </li>
      
      {{/each}}
     `
    //   console.log(recommendTpl);
     var html=template.render(recommendTpl,{data:data})
    //   console.log(html);
      
        $("#recommendBox").html(html)
    }

})