const{sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages for 2 pages', ()=> {
    const input = {
        'https://bricesiou.dev/resources': 2,
        'https://bricesiou.dev': 6

    }
    const actual = sortPages(input)
    const expected = [
        ['https://bricesiou.dev', 6],
        ['https://bricesiou.dev/resources', 2]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages for 7 pages', ()=> {
    const input = {
        'https://bricesiou.dev/resources4': 4,
        'https://bricesiou.dev': 6,
        'https://bricesiou.dev/resources2': 2,
        'https://bricesiou.dev/resources': 5,
        'https://bricesiou.dev/resources1': 1,
        'https://bricesiou.dev/resources8': 3,
        'https://bricesiou.dev/resources0': 9

    }
    const actual = sortPages(input)
    const expected = [
        ['https://bricesiou.dev/resources0', 9],
        ['https://bricesiou.dev', 6],
        ['https://bricesiou.dev/resources', 5],
        ['https://bricesiou.dev/resources4',4],
        ['https://bricesiou.dev/resources8',3],
        ['https://bricesiou.dev/resources2', 2],
        ['https://bricesiou.dev/resources1',1]
    ]
    expect(actual).toEqual(expected)
})