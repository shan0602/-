//向服务器发送请求,索要轮播图的数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(data){
        console.log(data);
        var html=template('bannerTpl',{data:data})
        $("#bannerBox").html(html)
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
              // index++;
      
              $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
          });
      
          // 上/下一张
          $('.swipe .arrow').on('click', function () {
            var _this = $(this);
      
            if(_this.is('.prev')) {
              swiper.prev();
            } else if(_this.is('.next')) {
              swiper.next();
            }
          })
    }
})

function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  }
//最新发布数据
$.ajax({
    type:'get',
    url:'/posts/lasted',
    success:function(data){
        // console.log(data);
        var html=template('lastTpl',{data:data})
        // console.log(html);
        
        $("#lastBox").html(html)
       
    }

})