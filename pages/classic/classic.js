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
    classicModel.getLatest((res) => {
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
    let index = this.data.classic.index;
    classicModel.getClassic(index, nextOrPre, (res) => {
      this._getLikeStatus(res.data.id, res.data.type);
      this.setData({
        classic: res.data,
        first: classicModel.isFirst(res.data.index),
        latest: classicModel.isLatest(res.data.index)
      });
    });
  },

  _getLikeStatus: function (artId, category) {
    likeModel.getClassicLikeStatus(artId, category, (res) => {
      this.setData({
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})