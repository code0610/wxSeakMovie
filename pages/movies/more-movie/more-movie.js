// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    baseUrl:"",
    isFirstRequet:true,
    totalDataCount:0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var moreName = options.moreName;
    wx.setNavigationBarTitle({
      title: moreName,
    })

    var baseUrl = app.loadData.doubanBaseUrl;
    switch (moreName) {
      case "正在热映":
        baseUrl += "/v2/movie/in_theaters";
        break;
      case "即将上映":
        baseUrl += "/v2/movie/coming_soon";
        break;
      case "TOP12":
        baseUrl += "/v2/movie/top250";
        break;
    }
    this.data.baseUrl = baseUrl;
    this.getAjaxMoviesData(baseUrl);
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh:function(event){
      consoel.log(event);
      console.log("下拉加载....");
  },
  
  /**
   * 滚动到底部加载
   */
  scrolltolower:function(){
    var nextUrl = this.data.baseUrl+"?start="+this.data.totalDataCount+"&count=20";
    wx.showNavigationBarLoading();
    this.getAjaxMoviesData(nextUrl);
  },

  /**
   * 发送请求  
   */
  getAjaxMoviesData: function(url) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function(rel) {
        // console.log(rel);
        that.responseData(rel);
        // console.log(that.data)
      },
      fail: function(error) {
        console.log(error);
      }
    })
  },

  /**
   * 响应的数据处理
   */

  responseData: function(rel) {
    var movies = [];
    var datas = rel.data.subjects;
    //[1,1,1,0,0]  [1,1,1,1,0]
    for (var i = 0; i < datas.length; i++) {
      movies.push({
        stars: util.stringToArrays(datas[i].rating.stars), //40 50 30 35
        imagesUrl: datas[i].images.large,
        title: datas[i].title.length > 6 ? datas[i].title.substring(0, 6) + "..." : datas[i].title,
        average: datas[i].rating.average
      })
    }

    var totalData = {};
    if (!this.data.isFirstRequet){//不是第一次请求
      totalData = this.data.movies.concat(movies);
      this.data.isFirstRequet = false;
    }else{//第一次请求
      totalData = movies;
      this.data.isFirstRequet = false;
    }

    // console.log(movies);
    this.setData({
      movies: totalData
    })

    this.data.totalDataCount += 20;
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})