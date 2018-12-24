import {
  BookModel
} from '../../models/book.js'

let bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res.data
        });
      })
  },

  /**
   * 点击搜索事件
   * @param {} event 
   */
  onSearching: function (event) {
    this.setData({
      searching: true
    });
  },

  /**
   * 取消搜索
   * @param {} event 
   */
  onCancel: function (event) {
    this.setData({
      searching: false
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      more: new Date().getTime()
    });
  }
})