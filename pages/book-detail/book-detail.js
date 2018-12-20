// pages/book-detail/book-detail.js
import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //加载提示
    wx.showLoading();

    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComment(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0].data,
          comments: res[1].data,
          likeStatus: res[2].data.likeStatus,
          likeCount: res[2].data.favNums
        });
        wx.hideLoading();
      });

    // detail.then((res) => {
    //   this.setData({
    //     book: res.data
    //   });
    // });

    // comments.then((res) => {
    //   this.setData({
    //     comments: res.data
    //   });
    // });

    // likeStatus.then((res) => {
    //   this.setData({
    //     likeStatus: res.data.likeStatus,
    //     likeCount: res.data.favNums
    //   });
    // });

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