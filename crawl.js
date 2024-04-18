const normalizeURL = url => {
    const urlObject = new URL(url);
    let fullPath = `${urlObject.host}${urlObject.pathname}`;
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
};

const getURLsFromHTML = () => {
    
};

module.exports = {
    normalizeURL,
    getURLsFromHTML
};