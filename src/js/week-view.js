import DEFAULTS from './defaults'

import {
    NAMESPACE
} from './constants'

import {
    CONTAINER
} from './templates'

import methods from './methods'

import handlers from './handlers'

import events from './events'

class WeekView {
    constructor (el, options) {
        let elem
        if (typeof el === 'string') {
            elem = document.querySelector(el)
        } else {
            elem = el
        }
        if (!elem || !elem.tagName) {
            throw new TypeError('el must be a valid selector or a DOM element')
        }
        this.el = elem
        this.options = Object.assign({}, DEFAULTS, options)
        this.init()
    }
    init() {
        if (this.el[NAMESPACE]) {
            return
        }
        this.el.innerHTML = CONTAINER
        this.width = this.el.clientWidth
        this.ul = this.el.querySelector(`.${NAMESPACE}-body ul`)
        this.dates = []
        this.handlers = {
            touchstart: function(){},
            touchmove: function(){},
            touchend: function(){},
            prev: function(){},
            next: function(){}
        }
        this.startX = null
        this.touchData = {
            startX: null,
            xArr: []
        }
        // startDate has priority over minDate and maxDate
        if (this.options.minDate > this.options.startDate) {
            this.options.minDate = new Date(this.options.startDate)
        }
        if (this.options.maxDate && this.options.maxDate < this.options.startDate) {
            this.options.maxDate = new Date(this.options.startDate)
        }
        // if (this.options.maxDate < this.options.minDate) {
        //     this.options.maxDate = null
        // }
        this.options.num = Math.min(this.options.num, 14)
        this.options.num = Math.max(1, this.options.num)
        this.el.querySelector(`.${NAMESPACE}-header`).style.display = this.options.showHeader? '':'none'
        this.setStart(this.options.startDate)
        this._bind()
        this.el[NAMESPACE] = this
    }
}
Object.assign(WeekView.prototype, events, handlers, methods)

export default WeekView