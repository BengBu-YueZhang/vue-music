import JSONP from 'jsonp'
import qs from 'qs'

function promiseJSONP (url, data, option) {
    url = `${url}?${qs.stringify(data)}`
    return new Promise((resolve, reject) => {
        JSONP(url, option, (err, res) => {
            if (!err) return resolve(res)
            return reject(err)
        })
    })
}

export default promiseJSONP

