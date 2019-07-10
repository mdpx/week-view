import {
    NAMESPACE,
    DRAG_THRESHOLD,
    VELOCITY_THRESHOLD,
    WIDTH_PER_THRESHOLD
} from './constants'

import {
    changeDate
} from './utilities'

export default {
    _touchstart(e) {
        let _this = this
        if (this.options.minDate < this.dates[0]) {
            let leftPeriod = this.generatePeriod(changeDate(this.dates[0], -this.options.num))
            for (let i=leftPeriod.elements.length - 1; i>=0; i--) {
                leftPeriod.elements[i].classList.add(`${NAMESPACE}-temp`)
                _this.ul.prepend(leftPeriod.elements[i])
            }
            this.ul.style.left = - this.width + 'px'
        }
        if (!this.options.maxDate || this.options.maxDate > this.dates[this.dates.length - 1]) {
            let rightPeriod = this.generatePeriod(changeDate(this.dates[this.dates.length - 1], 1))
            rightPeriod.elements.forEach(e => {
                e.classList.add(`${NAMESPACE}-temp`)
                _this.ul.append(e)
            })
        }
        this.ul.addEventListener('touchmove', this.handlers.touchmove)
        document.addEventListener('mousemove', this.handlers.touchmove)
        let eventX = e.clientX || e.touches[0].clientX
        this.touchData.startX = eventX
        this.touchData.xArr.push([eventX, Date.now()])
    },
    _touchmove(e) {
        let l = this.touchData.xArr.length
        let eventX = e.clientX || e.touches[0].clientX
        let delta = eventX - this.touchData.xArr[l - 1][0]
        this.touchData.xArr.push([eventX, Date.now()])
        let old = parseFloat(this.ul.style.left && this.ul.style.left.replace('px', '')) || 0
        if (
            delta > 0 // moving right
            && (this.indexOf(this.options.minDate) === -1 // minDate is not in current period
                || old < 0 // or ul is moved already, when no leftPeriod prepended
            )
            || delta < 0 && ( // moving left
                !this.options.maxDate || ( // no maxDate set
                    this.indexOf(this.options.maxDate) === -1 // maxDate is not in current period
                    || old < -this.width // or ul is moved already, when leftPeriod prepended
                )
            )
        ) { // update position
            this.ul.style.left = old + delta + 'px'
        }
    },
    _touchend(e) {
        let last = this.touchData.xArr[this.touchData.xArr.length - 1]
        if (!last) {
            return
        }
        this.ul.removeEventListener('touchmove', this.handlers.touchmove)
        document.removeEventListener('mousemove', this.handlers.touchmove)
        let delta = last[0] - this.touchData.startX
        let v = 0
        if (this.touchData.xArr.length > 1) {
            let last2 = this.touchData.xArr[this.touchData.xArr.length - 2]
            v = (last[0] - last2[0]) / (last[1] - last2[1]) * 1000
        }
        this.ul.querySelectorAll(`.${NAMESPACE}-temp`).forEach(e => {
            e.remove()
        })
        if (Math.abs(delta) > this.width * WIDTH_PER_THRESHOLD || Math.abs(v) > VELOCITY_THRESHOLD) {
            if (delta < 0) {
                this._next()
            } else {
                this._prev()
            }
        } else {
            if (Math.abs(delta) < DRAG_THRESHOLD) { // tap
                let el = e.srcElement || e.target
                while (el && el.tagName !== 'LI') {
                    if (el === this) {
                        el = null
                        break
                    }
                    el = el.parentElement
                }
                if (el && !el.classList.contains(`${NAMESPACE}-disabled`)) {
                    this.selectDate(this.dates[el.dataset['index']])
                }
            }
        }
        this.ul.style.left = ''
        this.touchData.startX = null
        this.touchData.xArr = []
    },
    _prev() {
        this.setStart(changeDate(this.dates[0], -this.options.num))
    },
    _next() {
        this.setStart(changeDate(this.dates[this.options.num - 1], 1))
    }
}