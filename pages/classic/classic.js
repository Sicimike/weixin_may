// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否授权
    const userInfo = wx.getStorageSync('userInfo');
    let openid = '';
    if (userInfo) {
      openid = userInfo.openid;
    }
    classicModel.getLatest(openid, (res) => {
      this.setData({
        classic: res.data,
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      });
    });
  },

  /**
   * 自定义事件
   */
  onLike: function (event) {
    //判断用户是否授权
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.switchTab({
        url: '/pages/my/my',
        success: function (res) {
          wx.showToast({
            title: '请点击头像授权',
            icon: 'none'
          });
        }
      })
      return;
    }
    let behavior = event.detail.behavior;
    likeModel.like(userInfo.openid, behavior, this.data.classic.id, this.data.classic.type);
  },

  onPrevious: function (event) {
    this._updateClassic('previous');
  },

  onNext: function (event) {
    this._updateClassic('next');
  },

  _updateClassic: function (nextOrPre) {
    //判断用户是否授权
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.switchTab({
        url: '/pages/my/my',
        success: function (res) {
          wx.showToast({
            title: '请点击头像授权',
            icon: 'none'
          });
        }
      })
      return;
    }
    let index = this.data.classic.index;
    classicModel.getClassic(userInfo.openid, index, nextOrPre, (res) => {
      this._getLikeStatus(userInfo.openid, res.data.id, res.data.type);
      this.setData({
        classic: res.data,
        first: classicModel.isFirst(res.data.index),
        latest: classicModel.isLatest(res.data.index)
      });
    });
  },

  _getLikeStatus: function (openid, artId, category) {
    likeModel.getClassicLikeStatus(openid, artId, category, (res) => {
      this.setData({
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      });
    });
  }

})