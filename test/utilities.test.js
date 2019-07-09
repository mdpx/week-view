import {
    changeDate,
    fullDate
} from '../src/js/utilities'

it('changeDate()', () => {
    expect( changeDate(new Date(2012,12,21,12,21,12), 1).getDate()).toBe(22)
})

it('fullDate()', () => {
    expect( fullDate(new Date(2012,12,21,12,21,12)) ).toBe('2013/01/21')
})