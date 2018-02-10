import Axios from './../util/axios'
import promiseJSONP from './../util/jsonp'

export function getSingerDetailAjax (singermid) {

    const api = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = {
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
        singermid: singermid
    }

    const option = {
        param: 'jsonpCallback'
    }

    return promiseJSONP(api, data, option)
}