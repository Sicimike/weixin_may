import {
    HTTP
}
from '../util/http-p.js'

const contentType = {
    form: 'application/x-www-form-urlencoded'
}

class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url: 'book/hot/list'
        });
    }

    search(start, q) {
        return this.request({
            url: 'book/search',
            method: 'POST',
            data: {
                start: start,
                content: q
            }
        });
    }

    getDetail(bid) {
        return this.request({
            url: 'book/' + bid + '/detail'
        });
    }

    getLikeStatus(bid) {
        return this.request({
            url: 'book/' + bid + '/favor'
        });
    }

    getComment(bid) {
        return this.request({
            url: 'book/' + bid + '/short/comment'
        });
    }

}

export {
    BookModel
}