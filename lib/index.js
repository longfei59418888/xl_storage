import {get as getCookie, set as setCookie, del as delCookie, clear as clearCookie} from 'xl_cookie'

const threeMonth = 60 * 60 * 24 * 30 * 3
let localStorageList = {}

// 清除过期的 storage
if (localStorage) {
    let keys = localStorage.getItem('localStorageList_threeMonth')
    if (keys) {
        Object.keys(JSON.parse(keys)).forEach(item => {
            get(item)
        })
    }
}

// 默认三个月
export const set = (attr, data, timeOut = threeMonth) => {
    if (localStorage) return setCookie(attr, data, timeOut)
    if (timeOut !== -1) timeOut = new Date().getTime() + timeOut * 1000
    data = data ? JSON.stringify({data, timeOut}) : null
    localStorage.setItem(attr, data)
    localStorageList[attr] = 1
    localStorage.setItem('localStorageList_threeMonth', JSON.stringify(localStorageList))
}

export function get(attr) {
    if (localStorage) return getCookie(attr)
    let data = localStorage.getItem(attr);
    if (data == null || data == "") return null;
    else {
        data = JSON.parse(data)
        let now = new Date().getTime()
        if (now > data.timeOut && data.timeOut !== -1) {
            remove(attr)
            return null
        }
        else return data.data
    }
}

export function remove(attr){
    if (localStorage) return delCookie(attr)
    localStorage.removeItem(attr)
    delete localStorageList[attr]
    localStorage.setItem('localStorageList_threeMonth', JSON.stringify(localStorageList))
}
export const clear = () => {
    if (localStorage) return clearCookie()
    localStorage.clear()
    localStorageList = {}
    localStorage.setItem('localStorageList_threeMonth', JSON.stringify(localStorageList))
}

function Storage(prefixName) {
    this.prefixName = `${prefixName}_module`
    let list = get(this.prefixName)
    this.list = list ? list : {}
    this.refresh()
    Object.keys(this.list).forEach((item) => {
        if(!this.get(item)){
            delete this.list[item]
        }
    })
    this.refresh()
}

Storage.prototype = {
    refresh: function () {
        set(this.prefixName, this.list)
    },
    get: function (attr) {
        return get(`${this.prefixName}_${attr}`)

    },
    set: function (attr, data, timeOut = -1) {
        attr = `${this.prefixName}_${attr}`
        set(attr, data, timeOut)
        this.list[attr] = 1
        this.refresh()
    },
    remove: function (attr) {
        attr = `${this.prefixName}_${attr}`
        remove(attr)
        delete  this.list[attr]
        this.refresh()
    },
    clear: function () {
        Object.keys(this.list).forEach((item) => {
            remove(item)
        })
        this.list = {}
        this.refresh()
    }
}

export default Storage



