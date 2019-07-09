/**
 * change the date by delta
 * @param {Date} date
 * @param {Number} delta
 * @returns {Date}
 */
export function changeDate(date, delta) {
    let d = new Date(date)
    d.setDate(d.getDate() + delta)
    return d
}

/**
 * Date formatted in 'yyyy/MM/dd'
 * @param {Date} date
 * @returns {String|Object}
 */
export function fullDate(date) {
    if (!Date.parse(date)) {
        // to make comparison behaves correctly
        return null
    }
    let da = new Date(date)
    let y = da.getFullYear()
    let m = da.getMonth() + 1
    let d = da.getDate()
    return `${y}/${m<10?'0'+m:m}/${d<10?'0'+d:d}`
}

export function formatStr() {
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
    }
    return str;
}
