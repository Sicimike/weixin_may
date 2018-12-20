import {
    HTTP
} from "../util/http-p.js";

/**
 * 搜索相关
 */
class KeywordModel extends HTTP {

    key = 'q';
    maxLength = 10;

    getHistory() {
        let history = wx.getStorageSync(this.key);
        if (history) {
            return history;
        }
        return [];
    }

    getHot() {
        return this.request({
            url:'book/hot/words'
        });
    }

    addToHistory(keyword) {
        let words = this.getHistory();
        if (!words.includes(keyword)) {
            if (words.length >= this.maxLength) {
                words.pop();
            }
            words.unshift(keyword);
            wx.setStorageSync(this.key, words);
        }

    }
}

export {
    KeywordModel
}