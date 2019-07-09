import WeekView from '../src/js/week-view'
import {fullDate} from '../src/js/utilities'

document.body.innerHTML = '<div id="week"></div>'

let today = new Date()
let later = new Date()
later.setDate(later.getDate() + 14)
let wv = new WeekView('#week', {
    maxDate: later
})

describe('setOptions', () => {
    it('headerText: header text should change', () => {
        wv.setOptions({headerText: date => date.toDateString()})
        expect(document.body.querySelector('.week-view-display').innerText).toBe(today.toDateString())
    })
    
    it('dateText: cells\' date text should change', () => {
        wv.setOptions({dateText: date => date.getDate() + '日'})
        expect(document.body.querySelectorAll('.week-view-date')[0].innerHTML).toBe(today.getDate() + '日')
    })

    it('cellClass: cells should have corresponding class', () => {
        let isWeekend = date => [6,0].includes(date.getDay())
        wv.setOptions({
            cellClass: {
                'week-end': isWeekend
            }
        })
        let li = document.body.querySelector('.week-view-body ul').children
        wv.dates.forEach((date, i) => {
            if (isWeekend(date)) {
                expect(li[i].classList.contains('week-end')).toBe(true)
            }
        })
    })

    it('days: cells\' day text should change', () => {
        wv.setOptions({days: [0,1,2,3,4,5,6]})
        expect(document.body.querySelectorAll('.week-view-day')[0].innerHTML).toBe(today.getDay().toString())
    })
})

describe('generatePeriod', () => {
    it('(today, tomorrow) should return array[7] of dates and array[7] of li elements, among which the second has selected class', () => {
        let {elements, dates} = wv.generatePeriod(today, new Date(today.getDate() + 1))
        expect(elements.length).toBe(7)
        expect(dates.length).toBe(7)
        expect(elements[0] instanceof HTMLLIElement).toBe(true)
        expect(dates[0] instanceof Date && !isNaN(Date.parse(dates[0]))).toBe(true)
    })
})

describe('setStart', () => {
    it('(date between minDate and maxDate): period set to starting from the date, and the date selected', () => {
        let start = new Date(wv.dates[3])
        wv.setStart(start)
        expect(fullDate(wv.dates[0])).toBe(fullDate(start))
        expect(fullDate(wv.selected)).toBe(fullDate(start))
        expect(document.body.querySelector('.week-view-date').classList.contains('week-view-selected')).toBe(true)
    })

    it('(date earlier than minDate but not earlier than minDate - 6): period set to starting from the date, minDate selected, prev button disabled', () => {
        let start = new Date(today)
        start.setDate(start.getDate() - 6)
        wv.setStart(start)
        expect(fullDate(wv.dates[0])).toBe(fullDate(start))
        expect(fullDate(wv.selected)).toBe(fullDate(wv.options.minDate))
        expect(document.body.querySelectorAll('.week-view-date')[6].classList.contains('week-view-selected')).toBe(true)
        expect(document.querySelector('.week-view-prev').classList.contains('week-view-disabled')).toBe(true)
    })

    it('(date earlier than minDate - 6 or later than maxDate): nothing should change', () => {
        let start = new Date(0)
        let oldStart = new Date(wv.dates[0])
        let oldSelected = new Date(wv.selected)
        wv.setStart(start)
        expect(wv.dates[0]).toEqual(oldStart)
        expect(wv.selected).toEqual(oldSelected)

        start = new Date(later)
        start.setDate(start.getDate() + 1)
        wv.setStart(start)
        expect(wv.dates[0]).toEqual(oldStart)
        expect(wv.selected).toEqual(oldSelected)
    })
})

describe('selectDate', () => {
    it('(date between minDate and maxDate): date should be selected', () => {
        let target = new Date(wv.options.minDate)
        wv.selectDate(target)
        expect(fullDate(wv.selected)).toBe(fullDate(wv.options.minDate))
    })

    it('others', () => {
        let target = new Date(wv.options.maxDate)
        target.setDate(target.getDate() + 1)
        let oldStart = new Date(wv.dates[0])
        let oldSelected = new Date(wv.selected)
        wv.selectDate(target)
        expect(wv.dates[0]).toEqual(oldStart)
        expect(wv.selected).toEqual(oldSelected)
    })
})

describe('isAvailable', () => {
    it('(date between minDate and maxDate): should return true', () => {
        let target = new Date(wv.options.minDate)
        expect(wv.isAvailable(target)).toBe(true)
    })
    it('others', () => {
        let target = new Date(wv.options.maxDate)
        target.setDate(target.getDate() + 1)
        expect(wv.isAvailable(target)).toBe(false)
    })
})

describe('indexOf', () => {
    it('(date between minDate and maxDate): should return corresponding index in the period', () => {
        let target = new Date(wv.dates[0])
        expect(wv.indexOf(target)).toBe(0)
    })
    it('others', () => {
        let target = new Date(wv.dates[6])
        target.setDate(target.getDate() + 1)
        expect(wv.indexOf(target)).toBe(-1)
    })
})