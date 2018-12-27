import {
    HTTP
} from '../util/http.js'

class LikeModel extends HTTP {
    like(openid, behavior, artId, category) {
        let url = behavior == 'like' ? 'like' : 'like/cancel';
        this.request({
            url: url,
            method: 'POST',
            data: {
                artId: artId,
                type: category,
                openid: openid
            }
        });
    }

    getClassicLikeStatus(openid, artId, category, sCallback) {
        this.request({
            url: 'classic/' + category + '/' + artId + '/' + openid + '/favor',
            success: sCallback
        });
    }
}

export {
    LikeModel
}