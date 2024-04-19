const { crawlPage } = require('./crawl.js');

const main = async () => {
    if (process.argv.length < 3) { 
        console.error('no url provided\nstop crawler');
        return;
    } else if (process.argv.length > 3) {
        console.error('too many arguments provided\nstop crawler');
        return;
    }
    const baseURL = process.argv[2]; 
    console.log(`staring crawl of: ${baseURL}`);

    await crawlPage(baseURL);
        
};

main();