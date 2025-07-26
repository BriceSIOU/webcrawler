const{normalizeURL } = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol https', ()=> {
    const input = 'https://bricesiou.com/resources'
    const actual = normalizeURL(input)
    const expected = 'bricesiou.com/resources'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip the bach slach', ()=> {
    const input = 'https://bricesiou.com/resources/'
    const actual = normalizeURL(input)
    const expected = 'bricesiou.com/resources'
    expect(actual).toEqual(expected)
})

test('normalizeURL change of the uppercases', ()=> {
    const input = 'https://briceSIOU.com/resources/'
    const actual = normalizeURL(input)
    const expected = 'bricesiou.com/resources'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip protocol http', ()=> {
    const input = 'http://bricesiou.com/resources'
    const actual = normalizeURL(input)
    const expected = 'bricesiou.com/resources'
    expect(actual).toEqual(expected)
})