import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false
  },

  /**
   * 组件初始化
   */
  attached: function () {
    const historyWords = keywordModel.getHistory();
    this.setData({
      historyWords
    });

    const hotWords = keywordModel.getHot();
    hotWords.then(res => {
      this.setData({
        hotWords: res.data
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel: function (event) {
      this.triggerEvent('cancel', {}, {});
    },

    onDelete: function (event) {
      this.setData({
        searching: false
      });
    },

    onConfirm: function (event) {
      this.setData({
        searching: true
      });

      const word = event.detail.value || event.detail.text;
      if (!word) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none'
        });
        this.setData({
          searching: false
        });
        return;
      }
      bookModel.search(0, word)
        .then(res => {
          this.setData({
            dataArray: res.data,
            q: word
          });
          keywordModel.addToHistory(word);
        })
    }
  }
})