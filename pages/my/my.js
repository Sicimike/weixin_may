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

const sourceCodePath = 'https://github.com/Sicimike/weixin_may';

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

  onShow(options) {
    this.userAuthorized();
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
          });

          let userInfo = wx.getStorageSync('userInfo');
          if (userInfo) {
            this.getMyClassicCount(userInfo.openid);
            this.getMyFavor(userInfo.openid);
          }
        }
      }
    })
  },

  onGetUserInfo: function (event) {
    const userInfo = event.detail.userInfo;
    //console.log(userInfo);
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
        //后台登录
        userModel.doLogin(res.code)
          .then(res => {
            // console.log(res);
            if (!res.data.errcode) {
              //在界面上设置用户信息
              _this.setData({
                userInfo,
                authorized: true
              });
              wx.setStorageSync('userInfo', res.data);
              _this.getMyClassicCount(res.data.openid);
              _this.getMyFavor(res.data.openid);
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

  onGetSourceCode: function () {
    wx.showActionSheet({
      itemList: [sourceCodePath, '拷贝链接'],
      success: function (event) {
        if (event.tapIndex === 1) {
          //拷贝
          wx.setClipboardData({
            data: sourceCodePath,
            success: function () {
              wx.showToast({
                title: '拷贝成功',
                icon: 'none'
              });
            }
          });
        }
      }
    });


  },

  getMyClassicCount: function (openid) {
    classicModel.getMyClassicCount(openid, res => {
      this.setData({
        classicCount: res.data
      });
    });
  },

  getMyFavor: function (openid) {
    classicModel.getMyFavor(openid, res => {
      this.setData({
        classics: res.data
      });
    });
  }
})