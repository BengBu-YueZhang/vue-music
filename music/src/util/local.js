let setLocal = (key, val) => {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object'){
        for(var i in setting){
            window.localStorage.setItem(i, JSON.stringify(setting[i]))
        }
    }else{
        window.localStorage.setItem(key, JSON.stringify(val))
    }
    
}

let getLocal = (key) => {
    if (key) return JSON.parse(window.localStorage.getItem(key))
    return null;  
}

let removeLocal = (key) => {
    window.localStorage.removeItem(key)
}

let clearLocal = () => {
    window.localStorage.clear()
}

export {
    setLocal,
    getLocal,
    removeLocal,
    clearLocal
}