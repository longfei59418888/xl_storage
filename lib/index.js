
const moduleName = '____MODULE___';

// 清除过期的 storage
Object.keys(localStorage).forEach(item => get(item));
// 默认三个月
export const set = (attr, data = null, timeOut = null) => {
    if (data === null || data === '') return;
    if (timeOut !== null) timeOut = new Date().getTime() + timeOut * 1000;
    data = JSON.stringify({ data, timeOut });
    localStorage.setItem(attr, data);
};

export function get(attr) {
    let data = localStorage.getItem(attr);
    if (data === null || data === '') return null;
    try {
        data = JSON.parse(data);
        const now = new Date().getTime();
        if (now > data.timeOut && data.timeOut !== null) {
            remove(attr);
            return null;
        }
        return data.data;
    } catch (e) {
        return null;
    }
}

export function remove(attr) {
    localStorage.removeItem(attr);
}

export const clear = () => {
    localStorage.clear();
};

class Storages {
    constructor(prefixName) {
        this.prefixName = `${moduleName + prefixName}___`;
    }
    get(attr) {
        return get(`${this.prefixName + attr}`);
    }
    set(attr, data = null, timeOut = null) {
        attr = `${this.prefixName + attr}`;
        set(attr, data, timeOut);
    }
    remove(attr) {
        attr = `${this.prefixName + attr}`;
        remove(attr);
    }
    clear = () => {
        Object.keys(localStorage).forEach((item) => {
            if (new RegExp(`^${this.prefixName}`).test(item)) {
                remove(item);
            }
        });
    }
}

export default Storages;
