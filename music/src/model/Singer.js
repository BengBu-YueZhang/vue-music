class Singer { 
    constructor (id, name, letter) {
        this.id = id
        this.name = name
        this.letter = letter
        this.imgurl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.id}.jpg?max_age=2592000`
    }
}

export default Singer