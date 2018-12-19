import {
    HTTP
}
from '../util/http-p.js'

class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url: 'book/hot/list'
        });
    }

    getDetail(bid) {
        return this.request({
            url: '/book/' + bid + '/detail'
        });
    }

    getLikeStatus(bid) {
        return this.request({
            url: '/book/' + bid + '/favor'
        });
    }

    getComment(bid) {
        return this.request({
            url: '/book/' + bid + '/short/comment'
        });
    }
}

export {
    BookModel
}