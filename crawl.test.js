const{normalizeURL,  getURLsFromHTML} = require('./crawl.js')
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

test('getURLsFromHTML for the absolute', ()=> {
    const inputHTMLBody =`
    <html>
     <body>
       <a href="https://bricesiou.com/resources/">
       Brice SIOU site
       </a>
    </html>
    `
    const inputBaseURL = "https://bricesiou.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://bricesiou.com/resources/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML for the relative', ()=> {
    const inputHTMLBody =`
    <html>
     <body>
       <a href="/resources/">
       Brice SIOU site
       </a>
    </html>
    `
    const inputBaseURL = "https://bricesiou.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://bricesiou.com/resources/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML for the relative and absolute', ()=> {
    const inputHTMLBody =`
    <html>
     <body>
       <a href="/resources1/">
       Brice SIOU site 1
       </a>

       <a href="https://bricesiou.com/resources2/">
       Brice SIOU site 2
       </a>
    </html>
    `
    const inputBaseURL = "https://bricesiou.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://bricesiou.com/resources1/', 'https://bricesiou.com/resources2/']
    expect(actual).toEqual(expected)
})


test('Invalid url test', ()=> {
    const inputHTMLBody =`
    <html>
     <body>
       <a href="Invalid">
       Invalid SITE
       </a>
    </html>
    `
    const inputBaseURL = "https://bricesiou.com"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})