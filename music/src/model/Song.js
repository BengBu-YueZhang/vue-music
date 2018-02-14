import { Base64 } from 'js-base64'
import { OK } from './../config/index'
import { getUid } from './../util/uid'
import { getLyric, getVKey } from './../api/song'

let urlMap = {}

class Song {
    constructor (id, mid, singer, name, album, duration, image, url) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.filename = `C400${this.mid}.m4a`
        if (urlMap[this.id]) {
            this.url = urlMap[this.id]
        } else {
            this._genUrl()
        }
    }

    getLyric () {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
    
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                this.lyric = Base64.decode(res.lyric)
                resolve(this.lyric)
                } else {
                reject('no lyric')
                }
            })
        })
    }

    _genUrl () {
        if (this.url) {
            return
        }
        getVKey(this.mid, this.filename).then((res) => {
            if (res.code === ERR_OK) {
                const vkey = res.data.items[0].vkey
                this.url = `http://dl.stream.qqmusic.qq.com/${this.filename}?vkey=${vkey}&guid=${getUid()}&uin=0&fromtag=66`
                urlMap[this.id] = this.url
            }
        })
    }
}

function filterSinger (singerInfo) {
    if (!singerInfo) return
    return singerInfo.map(singerInfoItem => singerInfoItem.name)
}

export function createSong (musicData) {
    let id = musicData.songid
    let mid = musicData.songmid
    let singer = filterSinger(musicData.singer)
    let name = musicData.songname
    let album = musicData.albumname
    let duration = musicData.interval
    let image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    // 歌曲链接，现在不知道
    let url = ''
    return new Song(id, mid, singer, name, album, duration, image, url)
}


export function isValidMusic(musicData) {
    return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}