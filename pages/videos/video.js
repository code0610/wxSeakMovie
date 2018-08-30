// pages/videos/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    videos: [{
        title: "牛叉乞丐和富婆精彩对话,乞丐太有才了",
        videoBgImage: "/images/movie_timg.jpg",
        video: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        id: 0,
        isVideoPlay: false
      },
      {
        title: "发哥走投无路,与狱警同归于尽",
        videoBgImage: "/images/movie.jpg",
        video: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        id: 1,
        isVideoPlay: false
      },
      {
        title: "过这减速带,只能乖乖慢行,不然直接把车截停",
        videoBgImage: "/images/movie_timg.jpg",
        video: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
        id: 2,
        isVideoPlay: false
      }
    ]
  },

  /**
   * 播放视频
   */
  playVideo: function(event) {
    console.log(event);
    var videos = this.data.videos;
    var videoId = event.currentTarget.dataset.videoid;
    for(var i = 0;i<videos.length;i++){
      wx.createVideoContext("video"+videos[i].id, this).pause();
      videos[i].isVideoPlay = false;
    }
    wx.createVideoContext("video" + videoId, this).play();
    videos[videoId].isVideoPlay = true;
    //  _video.play();
    this.setData({
      videos: videos
    })
  }
})