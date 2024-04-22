const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

const main = async () => {
    if (process.argv.length < 3) { 
        console.error('no url provided\nstop crawler');
        process.exit(1);
    } else if (process.argv.length > 3) {
        console.error('too many arguments provided\nstop crawler');
        process.exit(1);
    }
    const baseURL = process.argv[2]; 
    console.log(`starting crawl of: ${baseURL}\n`);
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);        
};

main();