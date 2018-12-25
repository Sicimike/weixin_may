import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'

const keywordModel = new KeywordModel();
const bookModel = new BookModel();
const pageSize = 20; //每次请求最多加载记录的条数

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: Number,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [], //历史搜索关键字
    hotWords: [], //热词
    dataArray: [], //数据集合
    searching: false, //是否是搜索页面
    lastPage: false, //是否是最后一页
    loading: false, //是否正在加载，防止重复请求
    loadingCenter: false,
    noneResult: false //没有数据
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

    /**
     * 点击取消
     * @param {} event 
     */
    onCancel: function (event) {
      this.triggerEvent('cancel', {}, {});
      this.setData({
        dataArray: []
      });

      this.setData({
        noneResult: false
      });
    },

    /**
     * 点击搜索框中的"x"
     * @param {} event 
     */
    onDelete: function (event) {
      this.setData({
        searching: false
      });
      this.setData({
        q: ''
      });
      this.data.lastPage = false;
      this.setData({
        dataArray: []
      });

      this.setData({
        noneResult: false
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
      this._showLoadingCenter();
      bookModel.search(0, word)
        .then(res => {
          this.setData({
            dataArray: res.data.data,
            q: word
          });
          this._hideLoadingCenter();
          keywordModel.addToHistory(word);
          if (res.data.total === 0) {
            this.setData({
              noneResult: true
            });
          }
        })
    },

    /**
     * 用户向上拉触底时加载下一页数据
     */
    loadMore: function () {
      if (!this.data.q) {
        return;
      }

      /**
       * 如果上一个请求未完成
       */
      if (this.data.loading) {
        return;
      }

      if (this.data.lastPage) {
        return;
      }

      //current page
      const pageNumber = parseInt(this.data.dataArray.length / pageSize);
      this.setData({
        loading: true
      });
      bookModel.search(pageNumber, this.data.q)
        .then(res => {
          const tempArray = this.data.dataArray.concat(res.data.data);
          this.setData({
            dataArray: tempArray
          });
          //分页总条数等于页面数组长度
          if (res.data.total <= this.data.dataArray.length) {
            this.data.lastPage = true;
          }
          this.setData({
            loading: false
          });
        }, () => {
          this.setData({
            loading: false
          });
        });
    },

    _showLoadingCenter: function () {
      this.setData({
        loadingCenter: true
      });
    },

    _hideLoadingCenter: function () {
      this.setData({
        loadingCenter: false
      });
    }

  }

})