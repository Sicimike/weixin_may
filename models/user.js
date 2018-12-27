import {
    HTTP
} from '../util/http-p.js'

const contentType = 'application/x-www-form-urlencoded';

class UserModel extends HTTP {

    doLogin(code) {
        return this.request({
            url: 'user/login',
            data: {
                code: code
            },
            method: 'POST',
            contentType: contentType
        });
    }
}

export {
    UserModel
}