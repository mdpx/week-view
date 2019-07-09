import WeekView from '../src/js/week-view'

document.body.innerHTML = '<div id="week"></div>'

let wv
describe('creating a WeekView with', () => {
    it('invalid selector should throw error', () => {
        let create = () => {
            wv = new WeekView('week')
        }
        expect(create).toThrow(/must be/)
    })
    
    it('valid selector', () => {
        wv = new WeekView('#week')
        expect(wv).toBeInstanceOf(WeekView)
    })

    it('not existing dom element should throw error', () => {
        let create = () => {
            wv = new WeekView('week')
        }
        expect(create).toThrow(/must be/)
    })

    it('proper dom element', () => {
        wv = new WeekView('#week')
        expect(wv).toBeInstanceOf(WeekView)
    })
})
