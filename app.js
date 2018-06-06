//app.js
var network = require("/utils/network.js")
App({
  globalData: {
    userInfo: null,
    uuid: null
  },
  onLaunch: function () {
    // 展示本地存储能力

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              var that = this;
              console.log(this.globalData);
              wx.checkSession({
                success: function () {
                  console.log(that);
                  //session_key 未过期，并且在本生命周期一直有效
                  if (that.globalData.uuid == null || that.globalData.uuid == '') {
                    wx.login({
                      success: res => {
                        console.log(res);
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        if (res.code) {
                          //发起网络请求
                          // wx.request({
                          //   url: that.url + 'wxLogin',
                          //   method: 'POST',
                          //   header: { 'content-type': 'application/json' },
                          //   data: { code: res.code, nickName: that.globalData.userInfo.nickName },
                          //   success: res => {
                          //     that.globalData.uuid= res.data.data

                          //   }

                          // })

                          network.request(that.url + "wxLogin", { code: res.code, nickName: that.globalData.userInfo.nickName }, function (res) {
                            //res就是我们请求接口返回的数据
                            console.log("request");
                            console.log(res.data);
                            that.globalData.uuid = res.data

                          }, function () {
                            wx.showToast({
                              title: '加载数据失败',
                            })
                          })

                        } else {
                          console.log('登录失败！' + res.errMsg)
                        }
                      }
                    })
                  }
                },
                fail: function () {
                  // session_key 已经失效，需要重新执行登录流程
                  // 登录
                  wx.login({
                    success: res => {
                      console.log(res);
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                      if (res.code) {
                        //发起网络请求
                        wx.request({
                          url: this.url + 'wxLogin',
                          method: 'POST',
                          header: { 'content-type': 'application/json' },
                          data: { code: res.code, nickName: this.globalData.userInfo.nickName },
                          success: res => {
                            console.log(res)
                          }

                        })
                      } else {
                        console.log('登录失败！' + res.errMsg)
                      }
                    }
                  })

                }
              })


            }
          })
        }
      }
    })
  },

  //url:"http://localhost:8080/web/api/"
  url: "http://localhost:8080/api/"
})