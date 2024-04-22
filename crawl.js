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

const crawlPage = async (baseURL, currentURL, pages) => {
    const currentURLObject = new URL(currentURL);
    const baseURLObject = new URL(baseURL);
    const normalizedURL = normalizeURL(currentURL);

    // if a link links to another host, stop crawling
    if (currentURLObject.hostname !== baseURLObject.hostname) { return pages; }

    // if the page is already visited, don't repeat http request
    if (pages[normalizedURL] > 0) { pages[normalizedURL]++; return pages; }

    // add page to map, when it is not existent yet
    pages[normalizedURL] = 1;

    // fetch html of currentURL
    console.log(`crawling in my skin... ${currentURL}`);
    let htmlBody = '';
    try {
        const init = { method:'GET', headers:{ 'Content-Type': 'text/html' } };
        const response = await fetch(currentURL, init);
        const contentType = response.headers.get('content-type');
        
        if (response.status > 399) {
            console.log(`HTTP error, status code ${response.status}`)
            return pages;
        }
        
        if (!contentType.includes('text/html')) {
            console.log(`Non-HTML response: ${contentType}`);
            return pages;
        }
        
        htmlBody = await response.text();
    } catch (e) { console.error(e.message); }

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const URL of nextURLs) { 
        pages = await crawlPage(baseURL, URL, pages);
    }

    return pages;
};

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};