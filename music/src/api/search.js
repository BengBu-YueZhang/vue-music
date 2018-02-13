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