// pages/posts/posts.js
var postData = require("../../data/posts-data.js")
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
    // console.log(postData.postList)
    this.setData({
      postList: postData.postList
    })
    // this.data.list = postData.postList;
  },

  showDetial:function(event){
    // console.log(event)
    // event.curre
   var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'posts-detail/posts-detail?id='+postId,
    })
  }

 
})