import {
    config
} from '../config.js'

const tips = {
    1: '抱歉，出现了未知错误',
    500: '服务器内部错误',
    1005: 'appKey无效，请联系管理员',
    3000: '期刊不存在'
}

//封装http请求
class HTTP {

    request({url,data={},method='GET'}){
        return new Promise((resolve, reject)=>{
            this._request(url,resolve,reject,data, method)
        })
    }

    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: config.api_base_url + url,
            data: data,
            method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json',
                'appKey': config.appKey
            }, // 设置请求的 header
            success: (res) => {
                let code = res.statusCode.toString();
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject();
                    this._show_error(code);
                }
            },
            fail: () => {
                reject();
                this._show_error(1);
            },
            complete: () => {
                // complete
            }
        })
    }

    _show_error(status) {
        if (!status) {
            status = 1;
        }
        const tip = tips[status];
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        });
    }
}

export {
    HTTP
}