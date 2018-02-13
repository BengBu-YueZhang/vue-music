import Axios from './../util/axios'
import promiseJSONP from './../util/jsonp'

export function getHotSearchAjax () {
    const api = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = {
        g_tk: '1928093487',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    }

    const option = {
        param: 'jsonpCallback'
    }

    return promiseJSONP(api, data, option)
}

export function searchKeyAjax (key) {
    const api = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

    const data = {
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        w: key,
        p: 1,
        perpage: 20,
        n: 20,
        catZhida: 1,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0, 
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    }

    const option = {
        param: 'jsonpCallback'
    }

    return promiseJSONP(api, data, option)
}