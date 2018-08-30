// pages/posts/posts-detail/posts-detail.js
var postsData = require("../../../data/posts-data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var postId = options.id;
    var post_data = postsData.postList[postId];
    var postsKey = wx.getStorageSync("postsKey");
    this.setData({
      postData:post_data,
      postId:postId,
      collectioned: postsKey[postId] ? postsKey[postId] : false,
      musicType:false
    })
  },

  /**
   * 收藏方法
   */
  collectionAnti:function(){
    var postsKey = wx.getStorageSync("postsKey");
    if (postsKey){//有离线存储
      postsKey[this.data.postId] = !postsKey[this.data.postId];
    }else{//没有设置离线存储
      postsKey = {};
      postsKey[this.data.postId] = true;
    }
    wx.setStorageSync("postsKey", postsKey)

    if(postsKey[this.data.postId]){
        wx.showToast({
          title: '收藏成功',
          icon:"succcess",
          duration:1000
        })
    }else{
      wx.showToast({
        title: '取消成功',
      })
    }
    this.setData({
      collectioned: postsKey[this.data.postId]
    })
  },

  /**
   * 分享方法
   */
  shareAnti:function(){
    var itemList = [
      "分享给微信好友",
      "分享到微信朋友圈",
      "分享给QQ好友",
      "分享到微博",
      "分享到QQ空间"
    ];
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
          wx.showModal({
            title: '分享成功',
            content: '已将内容 ' + itemList[res.tapIndex],
          })
      },
      fail:function(){

      }
    })
  },

  /**
   * 播放音乐
   */
  musicStart:function(){
      
    var postData = postsData.postList[this.data.postId];

      this.setData({
        musicType: !this.data.musicType
      })

      if(this.data.musicType){
        wx.playBackgroundAudio({
          dataUrl: postData.music.url,
          title:postData.music.title,
          coverImgUrl: postData.music.coverImg
        })
      }else{
        wx.pauseBackgroundAudio();
      }
  }
})