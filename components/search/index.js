import {
  KeywordModel
} from '../../models/keyword.js'

const keywordModel = new KeywordModel();

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
    hotWords: []
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
    onConfirm: function (event) {
      const word = event.detail.value;
      keywordModel.addToHistory(word);
    }
  }
})