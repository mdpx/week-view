import {
    NAMESPACE
} from './constants'

import {
    CELL
} from './templates'

import {
    changeDate,
    fullDate,
    formatStr
} from './utilities'

export default {
    /**
     * set new options for the instance, auto refresh
     * @param {Object} options
     * @returns {WeekView}
     */
    setOptions(options) {
        if (options && typeof options === 'object') {
            // TODO: support these
            const ignore = ['minDate', 'maxDate', 'startDate', 'num']
            const incoming = Object.keys(options)
            ignore.forEach(i => {
                if (incoming.includes(i)) {
                    console.warn(ignore.toString() + ' are not supported for new options')
                    delete options[i]
                }
            })
            if (Object.keys(options).length) {
                Object.assign(this.options, options)
                this.el.querySelector(`.${NAMESPACE}-header`).style.display = this.options.showHeader? '':'none'
                return this.refresh()
            }
        }
        return this
    },

    /**
     * re-render current period, e.g. new options set
     * @returns {WeekView}
     */
    refresh() {
        this.width = this.el.clientWidth
        let period = this.generatePeriod(this.dates[0], this.selected)
        this.ul.innerHTML = ''
        period.elements.forEach(e => {
            this.ul.appendChild(e)
        })
        this.el.querySelector(`.${NAMESPACE}-display`).innerText = this.options.headerText(this.selected)
        return this
    },

    /**
     * generate dates and DOM elements for a period starting from 'start'
     * @param {Date} start - start date for the period
     * @param {Date} selected - optional, selected date
     * @returns {Object}
     */
    generatePeriod(start, selected) {
        let iterator = new Date(start)
        let dates = []
        let elements = []
        for (let i=0; i<this.options.num; i++) {
            dates.push(new Date(iterator))

            let li = document.createElement('li')
            li.style.width = `${(this.width / this.options.num).toFixed(1)}px`
            li.innerHTML = formatStr(CELL, this.options.days[iterator.getDay()], this.options.dateText(iterator))
            if (!this.isAvailable(iterator)) {
                li.classList.add(`${NAMESPACE}-disabled`)
            }
            if (selected && fullDate(iterator) === fullDate(selected)) {
                li.querySelector(`.${NAMESPACE}-date`).classList.add(`${NAMESPACE}-selected`)
            }
            for (let key in this.options.cellClass) {
                if (this.options.cellClass[key](iterator)) {
                    li.classList.add(key)
                }
            }
            li.dataset['index'] = i
            elements.push(li)

            iterator.setDate(iterator.getDate() + 1)
        }
        return {
            dates: dates,
            elements: elements
        }
    },

    /**
     * set the period starting from 'start', set 'offset'th date in the period selected
     * @param {Date} start - start date of the period
     * @param {Number} offset - optional, index of the selected date in the period
     * @returns {WeekView}
     */
    setStart(start, offset) {
        offset = offset || 0
        var fakeStart = new Date(start)
        fakeStart.setDate(fakeStart.getDate() + this.options.num - 1) // the first available date in the list can be max (num - 1) days earlier
        if (this.isAvailable(start) || this.isAvailable(fakeStart)) {
            let period = this.generatePeriod(start)
            this.ul.innerHTML = ''
            period.elements.forEach(e => {
                this.ul.appendChild(e)
            })
            let oldStart
            if (this.dates[0]) {
                oldStart = new Date(this.dates[0])
            }
            this.dates = period.dates
            oldStart && this.options.onChangePeriod(oldStart, this.dates[0])
            
            let $prev = this.el.querySelector(`.${NAMESPACE}-prev`)
            let $next = this.el.querySelector(`.${NAMESPACE}-next`)
            $prev.classList.remove(`${NAMESPACE}-disabled`)
            $next.classList.remove(`${NAMESPACE}-disabled`)
            if (this.indexOf(this.options.minDate) > -1) {
                $prev.classList.add(`${NAMESPACE}-disabled`)
            }
            if (this.options.maxDate && this.indexOf(this.options.maxDate) > -1) {
                $next.classList.add(`${NAMESPACE}-disabled`)
            }

            let sel = 0
            if (!this.isAvailable(start)) {
                this.dates.forEach((d, i) => {
                    if (fullDate(d) === fullDate(this.options.minDate)) {
                        sel = i
                    }
                })
            }
            this.selectDate(this.dates[Math.max(offset, sel)])
        }
        return this
    },

    /**
     * try to set the given date selected
     * @param {Date} date 
     * @returns {WeekView}
     */
    selectDate(date) {
        let fd = fullDate(date)
        let fmin = fullDate(this.options.minDate)
        let fmax = null
        if (this.options.maxDate) {
            fmax = fullDate(this.options.maxDate)
        }
        let fl = fullDate(this.dates[0])
        let fr = fullDate(this.dates[this.dates.length - 1])
        if (fd < fmin || fd > fmax) {
            return this
        }
        let testDate = new Date(fd + ' 00:00:00')
        let leftDate = new Date(fl + ' 00:00:00')
        let rightDate = new Date(fr + ' 00:00:00')
        if (fd < fl) {
            let days = parseInt((rightDate - testDate)/1000/60/60/24)
            let delta = parseInt(days / this.options.num)
            let offset = this.options.num - days % this.options.num - 1
            this.setStart(changeDate(leftDate, -delta * this.options.num), offset)
        } else if (fd > fr) {
            let days = parseInt((testDate - leftDate)/1000/60/60/24)
            let delta = parseInt(days / this.options.num)
            let offset = days % this.options.num
            this.setStart(changeDate(leftDate, delta * this.options.num), offset)
        }
        
        let index = 0
        this.dates.forEach((d, i) => {
            if (fullDate(d) === fullDate(date)) {
                index = i
            }
        })
        this.ul.querySelectorAll(`.${NAMESPACE}-date`).forEach((e, i) => {
            if (i === index) {
                e.classList.add(`${NAMESPACE}-selected`)
            } else {
                e.classList.remove(`${NAMESPACE}-selected`)
            }
        })
        this.selected = new Date(this.dates[index])
        this.options.onSelect(this.selected)
        this.el.querySelector(`.${NAMESPACE}-display`).innerText = this.options.headerText(this.dates[index])
        return this
    },

    /**
     * destroy the instance
     */
    destroy() {
        this._unbind()
        this.el.innerHTML = ''
        delete this.el[NAMESPACE]
    },

    /**
     * tell if the given date is available
     * @param {Date} date
     * @returns {Boolean}
     */
    isAvailable(date) {
        return Date.parse(date) && fullDate(date) >= fullDate(this.options.minDate) && (!this.options.maxDate || fullDate(date) <= fullDate(this.options.maxDate))
    },

    /**
     * return the given date's index in the current period
     * @param {Date} date
     * @returns {Number}
     */
    indexOf(date) {
        let ret = -1
        for (let i = 0; i < this.options.num; i++) {
            if (fullDate(this.dates[i]) === fullDate(date)) {
                ret = i
                break
            }
        }
        return ret
    }
}