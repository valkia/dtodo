//todo.js
//路径根据自己项目路径修改
var network = require("../../utils/network.js")
const app = getApp()
Page({
  data: {
    params: {
      password
      :
      "123123",
      username
      :
      "180000"
    }

  },
  getList: function () {
    network.requestLoading(app.url + "task/getList", this.data.params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)

    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  login: function () {
    network.requestLoading(app.url + "login", this.data.params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      //getList()
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  
  onLoad: function () {
    this.getList()
  }
})
// 作者：Code4Android
// 链接：https://www.jianshu.com/p/9796743d688f
// 來源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。