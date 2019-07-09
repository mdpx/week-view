import WeekView from '../src/js/week-view'

document.body.innerHTML = '<div id="week"></div>'

let today = new Date()
let wv = new WeekView('#week')

describe('validate default produce', () => {
    it('dates[0] and options.minDate should be the same date as today', () => {
        let d = wv.dates[0]
        expect(
            d.getFullYear() === today.getFullYear()
            && d.getMonth() === today.getMonth()
            && d.getDate() === today.getDate()
        ).toBe(true)
        d = wv.options.minDate
        expect(
            d.getFullYear() === today.getFullYear()
            && d.getMonth() === today.getMonth()
            && d.getDate() === today.getDate()
        ).toBe(true)
    })
    it('dates should contain 7 days', () => {
        expect(wv.dates.length).toBe(7)
    })
    it('selected should be first date', () => {
        expect(wv.selected).toEqual(wv.dates[0])
    })
})