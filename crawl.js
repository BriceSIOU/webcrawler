const {JSDOM} = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL (currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname){
        return pages

    }

    const normalizeCurrentURL = normalizeURL(currentURL)
    if(pages[normalizeCurrentURL] > 0){
        pages[normalizeCurrentURL]++
        return pages
    }

    pages[normalizeCurrentURL] = 1

    console.log (`actively crawling: ${currentURL}`)

    try{
        const resp = await fetch (currentURL)
        if(resp.status >399){
            console.log(`error in the fetch with status code: ${resp.status} on the page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`Non html reponse: ${contentType} on the page: ${currentURL}`)
            return pages
        } 
        const htmlBody = await resp.text()
        const nextURLS = getURLsFromHTML (htmlBody, baseURL)
        for (const nextURL of nextURLS){
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    }catch(err){
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
    return pages
}
function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements){
        if(linkElement.href.slice(0, 1)===`/`){
            //for relative url
            try{
            const urlObj = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlObj.href)
        }catch(err){
            console.log(`Error with relative url: ${err.message}`)
        }
        }else{
            // for absolute
            try{
                 const urlObj = new URL(`${linkElement.href}`)
            urls.push(urlObj.href)
            }catch (err){
              console.log(`Error with absolute url: ${err.message}`)

            }
        }
     
    }
    return urls
}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostUrl = `${urlObj.hostname}${urlObj.pathname}`
    if (hostUrl.length>0 && hostUrl.slice(-1) ===`/`){
        return hostUrl.slice(0, -1)
    }
    return hostUrl
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}