import {
  classicBeh
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],

  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    palying: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached: function (event) {
    this._recevoerStatus();
    this._monitorSwitch();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onPlay: function (event) {
      if (!this.data.palying) {
        this.setData({
          palying: true
        });
        mMgr.src = this.properties.src;
        mMgr.title = '未名';
      } else {
        this.setData({
          palying: false
        });
        mMgr.pause();
      }
    },

    _recevoerStatus: function () {
      if (mMgr.paused) {
        this.setData({
          palying: false
        });
        return;
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          palying: true
        });
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recevoerStatus();
      });
      mMgr.onPause(() => {
        this._recevoerStatus();
      });
      mMgr.onStop(() => {
        this._recevoerStatus();
      });
      mMgr.onEnded(() => {
        this._recevoerStatus();
      });
    }
  }
})