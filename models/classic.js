import {
    HTTP
} from '../util/http.js'

const contentType = 'application/x-www-form-urlencoded';

class ClassicModel extends HTTP {
    getLatest(openid, sCallBack) {
        this.request({
            url: 'classic/latest',
            data: {
                openid: openid
            },
            contentType: contentType,
            success: (res) => {
                sCallBack(res);
                wx.setStorageSync('latest', res.data.index);

                let key = this._getKey(res.data.index);
                wx.setStorageSync(key, res.data);
            }
        });
    }

    getClassic(openid, index, nextOrPre, sCallBack) {
        let key = nextOrPre == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
        let classic = wx.getStorageSync(key);
        if (!classic) {
            this.request({
                url: 'classic/' + index + '/' + nextOrPre,
                data: {
                    openid: openid
                },
                contentType: contentType,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.data.index), res.data);
                    sCallBack(res);
                }
            });
        } else {
            let res = {
                data: classic
            }
            sCallBack(res);
        }

    }

    getMyFavor(success) {
        const param = {
            url: 'classic/favor',
            success: success
        }
        this.request(param);
    }

    isFirst(index) {
        return index === 1;
    }

    isLatest(index) {
        return index == wx.getStorageSync('latest');
    }

    _getKey(index) {
        return 'classic-' + index;
    }
}

export {
    ClassicModel
}