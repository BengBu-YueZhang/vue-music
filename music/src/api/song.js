import Axios from './../util/axios'
import promiseJSONP from './../util/jsonp'
import { getUid } from './../util/uid'

const debug = process.env.NODE_ENV !== 'production'

export function getLyric(mid) {
  const api = debug ? '/api/lyric' : 'http://ustbhuangyi.com/music/api/lyric'

  const data = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  }

  return axios.get(api, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getVKey(songmid, filename) {
  const api = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    cid: 205361747,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  }

  const options = {
    param: 'jsonpCallback',
    prefix: 'jp'
  }

  return promiseJSONP(url, data, {...options, param: 'callback'})
}