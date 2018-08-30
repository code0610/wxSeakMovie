var stringToArrays = function(str){
  //40  50  35  [1,1,1,1,0] 
  var num = str.toString().substring(0,1);
  var arrays = [];
  for(var i = 0;i<5;i++){
    if(i<num){
      arrays.push(1);
    }else{
      arrays.push(0);
    }
  }
  return arrays;
}
/**
 * 发送请求工具类
 */
var doubanHttp=function(url,successFunction) {
  var that = this;
  wx.request({
    url: url,
    method: "GET",
    header: {
      'content-type': 'application/xml' // 默认值
    },
    success: function (rel) {
      // console.log(rel);
      // that.responseData(rel);
      // console.log(that.data)
      successFunction(rel);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

module.exports = {
  stringToArrays: stringToArrays,
  doubanHttp: doubanHttp
}