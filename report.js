// uses the pages object and sorts it from highest to lowest
// returns Array of Arrays
const sortPages = pages => {
    const returnArr = Object.entries(pages);
    returnArr.sort((a, b) => b[1] - a[1]);
    return returnArr;
};

// uses the pages object and prints a human readable report
const printReport = pages => {
    console.log('\n*********************************');
    console.log('\n Starting Report of crawled Page \n');
    console.log('*********************************\n');
    const sorted = sortPages(pages);
    for (const sortedPage of sorted) {
        const linksCount = sortedPage[1];
        const url = sortedPage[0];

        if (linksCount > 99) {
            console.log(`> ${linksCount} internal links in:  ${url}`);
        }
        if (linksCount > 9) {
            console.log(`> ${linksCount}  internal links in:  ${url}`);
        }
        if (linksCount < 10) {
            console.log(`> ${linksCount}   internal links in:  ${url}`);
        }
    }
    console.log('\n*********************************\n');
};

module.exports = {
    sortPages,
    printReport
};