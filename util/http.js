import {config} from '../config.js'

const tips = {
    1: '抱歉，出现了未知错误',
    500: '服务器内部错误',
    1005: 'appKey无效，请联系管理员',
    3000: '期刊不存在'
}

//封装http请求
class HTTP {
    request(params){
        if(!params.method){
            params.method = 'GET';
        }
        wx.request({
            url: config.api_base_url + params.url,
            data: params.data,
            method: params.method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
             header: {
                 'content-type':'application/json',
                 'appKey':config.appKey
             }, // 设置请求的 header
            success: (res)=>{
                let code = res.statusCode.toString();
                if(code.startsWith('2')){
                    params.success(res.data);
                } else {
                    this._show_error(code);
                }
            },
            fail: ()=>{
                this._show_error(1);
            },
            complete: ()=>{
                // complete
            }
        })
    }

    _show_error(status){
        if(!status){
            status = 1;
        }
        wx.showToast({
            title: tips[status],
            icon: 'none',
            duration: 2000
        });
    }
}

export {HTTP}