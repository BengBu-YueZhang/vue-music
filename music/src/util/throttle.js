function throttle (fn, time = 500) {
    let self = fn
    let timer = null
    let isFirst = true

    return function (...rest) {
        if (isFirst) {
            self(...rest)
            return isFirst = false
        }
        
        if (timer) {
            return false
        }

        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
            self(...rest)
        }, time)
    }
}

export default throttle