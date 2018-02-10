class Song {
    constructor (id, mid, singer, name, album, duration, image, url) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
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