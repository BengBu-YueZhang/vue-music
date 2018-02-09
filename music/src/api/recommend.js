import Axios from './../util/axios'
import promiseJSONP from './../util/jsonp'

// 轮播图
export function getCarouselDataAjax () {
    const api = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = {
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    }

    // 指定callback的key
    const option = {
        param: 'jsonpCallback'
    } 

    return promiseJSONP(api, data, option)
}

// 推荐歌单
export function getRecommendSongListAjax () {
    const api = '/music/api/getDiscList'

    const data = {
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'json',
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
    }

    return Axios.get(api, {
        params: data
    })
}