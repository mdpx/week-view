import {
    NAMESPACE
} from './constants'

import {
    changeDate
} from './utilities'

export default {
    _bind() {
        for (let key in this.handlers) {
            this.handlers[key] = (e) => {
                if (this.el.contains(e.target) || e.target === this.el) {
                    e.preventDefault()
                    this['_'+key](e)
                }
            }
        }
        this.ul.addEventListener('touchstart', this.handlers.touchstart)
        this.ul.addEventListener('touchend', this.handlers.touchend)
        document.addEventListener('mousedown', this.handlers.touchstart)
        document.addEventListener('mouseup', this.handlers.touchend)
        this.el.querySelector(`.${NAMESPACE}-prev`).addEventListener('click', this.handlers.prev)
        this.el.querySelector(`.${NAMESPACE}-next`).addEventListener('click', this.handlers.next)
    },
    _unbind() {
        this.ul.removeEventListener('touchstart', this.handlers.touchstart)
        this.ul.removeEventListener('touchend', this.handlers.touchend)
        document.removeEventListener('mousedown', this.handlers.touchstart)
        document.removeEventListener('mouseup', this.handlers.touchend)
        this.el.querySelector(`.${NAMESPACE}-prev`).removeEventListener('click', this.handlers.prev)
        this.el.querySelector(`.${NAMESPACE}-next`).removeEventListener('click', this.handlers.next)
    }
}