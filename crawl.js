const {JSDOM} = require('jsdom')

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
    getURLsFromHTML
}