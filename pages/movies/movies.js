// pages/movies/movies.js

var util = require("../utils/util.js");

var app = getApp();
var intheatersData = {};//正在热映
var comingSoonData = {};//即将上映
var top250Data = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInputShow:false,
    searchMovies:{},
    inputText:""
  },

  /**
   * 跳转到电影详情页面
   */
  toMovieDetail:function(event){
      // console.log(event)
    var movieId = event.currentTarget.dataset.movieid;
      wx.navigateTo({
        url: 'movie-detail/movie-detail?id='+movieId,
      })
  },

  /**
   * 搜索框获取焦点
   */
  onsearchFocus:function(){
    console.log("获取焦点");
    this.setData({
      isInputShow:true
    })
  },
  /**
   * 搜索框失去焦点
   */
  onsearchBlur:function(event){
    //  console.log(event);
    var inputText = event.detail.value;
    var searchUrl = app.loadData.doubanBaseUrl + "/v2/movie/search?q=" +inputText;
    this.getSearchAjaxMoviesData(searchUrl);
  },
  /**
   * 搜索页面发送请求
   */
  getSearchAjaxMoviesData: function (url) {
    var that = this;

    wx.request({
      url: url,
      method: "GET",
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function (rel) {
        // console.log(rel);
        var movies = [];
        var datas = rel.data.subjects;
        //[1,1,1,0,0]  [1,1,1,1,0]
        for (var i = 0; i < datas.length; i++) {
          movies.push({
            stars: util.stringToArrays(datas[i].rating.stars),//40 50 30 35
            imagesUrl: datas[i].images.large,
            title: datas[i].title.length > 6 ? datas[i].title.substring(0, 6) + "..." : datas[i].title,
            average: datas[i].rating.average,
            id: datas[i].id
          })
        }
        that.setData({
          searchMovies:movies
        })
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  /**
   * 关闭搜索页面
   */
  closeSearch:function(){
    this.setData({
      isInputShow:false,
      searchMovies:{},
      inputText:""
    })
  },

  /**
   * 跳转到更多页面
   */
  moreMovie:function(event){
    var moreTitle = event.currentTarget.dataset.moretitle;
    // console.log(event);
    wx.navigateTo({
      url: 'more-movie/more-movie?moreName='+moreTitle,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var intheatersUrl = app.loadData.doubanBaseUrl + "/v2/movie/in_theaters";
    var comingSoon = app.loadData.doubanBaseUrl+"/v2/movie/coming_soon";
    var top250 = app.loadData.doubanBaseUrl+"/v2/movie/top250";
    this.getAjaxMoviesData(intheatersUrl,0,"正在热映",3);
    this.getAjaxMoviesData(comingSoon, 1, "即将上映",3);
    this.getAjaxMoviesData(top250, 2, "TOP12",12);
  },
  /**
   * 发送请求
   */
  getAjaxMoviesData: function(url,indexType,titleText,counts) {
    var that = this;
    
    wx.request({
      url: url,
      data: {
        start: 0,
        count: counts
      },
      method: "GET",
      header: {
        'content-type': 'application/xml' // 默认值
      },
      success: function(rel) {
        // console.log(rel);
        var movies = [];
        var datas = rel.data.subjects;
        //[1,1,1,0,0]  [1,1,1,1,0]
        for (var i = 0; i < datas.length; i++) {
          movies.push({
            stars: util.stringToArrays(datas[i].rating.stars),//40 50 30 35
            imagesUrl: datas[i].images.large,
            title: datas[i].title.length>6?datas[i].title.substring(0,6)+"...":datas[i].title,
            average: datas[i].rating.average,
            id:datas[i].id
          })
        }

        if (indexType == 0){
          intheatersData["title"] = titleText;
          intheatersData["moviesData"] = movies;
        }else if(indexType == 1){
          comingSoonData["title"] = titleText;
          comingSoonData["moviesData"] = movies;
        }else{
          top250Data["title"] = titleText;
          top250Data["moviesData"] = movies;
        }


        that.setData({
          intheatersData: intheatersData,
          comingSoonData: comingSoonData,
          top250Data: top250Data
        })

        // console.log(that.data)
      },
      fail: function(error) {
        console.log(error);
      }
    })
  }
})