import {
    HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
    getLatest(sCallBack) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallBack(res);
                wx.setStorageSync('latest', res.data.index)
            }
        });
    }

    getClassic(index, nextOrPre, sCallBack) {
        this.request({
            url: 'classic/' + index + '/' + nextOrPre,
            success: (res) => {
                sCallBack(res);
            }
        });
    }

    isFirst(index) {
        return index === 1;
    }

    isLatest(index) {
        return index == wx.getStorageSync('latest');
    }
}

export {
    ClassicModel
}