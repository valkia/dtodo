// //todo.js
// //路径根据自己项目路径修改
// var network = require("../../utils/network.js")
// const app = getApp()
// Page({
//   data: {
//     params: {
//       password
//       :
//       "123123",
//       username
//       :
//       "180000"
//     },
//     list:[]

//   },
//   getList: function () {
//     var that = this
//     network.requestLoading(app.url + "task/getList", this.data.params, '正在加载数据', function (res) {
//       //res就是我们请求接口返回的数据
//       that.setData({
//         list:res.data
//       })

//     }, function () {
//       wx.showToast({
//         title: '加载数据失败',
//       })
//     })
//   },
//   login: function () {
//     network.requestLoading(app.url + "login", this.data.params, '正在加载数据', function (res) {
//       //res就是我们请求接口返回的数据
//       console.log(res)
//       //getList()
//     }, function () {
//       wx.showToast({
//         title: '加载数据失败',
//       })
//     })
//   },
  
//   onLoad: function () {
//     this.getList()
//   }
// })
// // 作者：Code4Android
// // 链接：https://www.jianshu.com/p/9796743d688f
// // 來源：简书
// // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

//todo.js
var network = require("../../utils/network.js")
const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["未完成", "已完成","全部"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    params: {
       password
      :
      "123123",
      username
      :
      "180000"
    },
    list:[]
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 3,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });

 

      }
    });
  },

  getList: function () {
    var that = this
    network.requestLoading(app.url + "task/getList", this.data.params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      that.setData({
        list: res.data
      })

    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  tabClick: function (e) {
    this.getList();
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
});