import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'
import {
  UserModel
} from '../../models/user.js'

let classicModel = new ClassicModel();
let bookModel = new BookModel();
let userModel = new UserModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onLoad(options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (event) {
    const userInfo = event.detail.userInfo;
    //用户拒绝授权
    if (!userInfo) {
      return;
    }

    //后台登录，如果已经授权过则不发送请求
    if (this.data.authorized) {
      return;
    }
    let _this = this;
    wx.login({
      success: function (res) {
        userModel.doLogin(res.code)
          .then(res => {
            console.log(res);
            if (!res.data.errcode) {
              //在界面上设置用户信息
              _this.setData({
                userInfo,
                authorized: true
              });
            } else {
              wx.showToast({
                title: '网络异常',
                icon: 'none'
              });
            }

          });
      },
      fail: function () {
        console.log('wx.log fail.');
      }
    })
  },

  getMyBookCount: function () {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.data
        });
      })
  },

  getMyFavor: function () {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res.data
      });
    });
  }
})