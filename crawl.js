const { JSDOM } = require('jsdom');

const normalizeURL = url => {
    const urlObject = new URL(url);
    let fullPath = `${urlObject.host}${urlObject.pathname}`;
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const link of linkElements) {
        if (link.href.slice(0, 1) === '/') {
            try { urls.push(new URL(link.href, baseURL).href) } 
            catch (e) { console.log(`${e.message}: ${link.href}`) }
        } else {
            try { urls.push(new URL(link.href).href) } 
            catch (e) { console.log(`${e.message}: ${link.href}`) }
        }
    }
    return urls;
};

module.exports = {
    normalizeURL,
    getURLsFromHTML
};