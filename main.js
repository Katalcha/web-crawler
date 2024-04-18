const main = () => {
    if (process.argv.length < 3) { 
        console.log('no url provided');
    } else if (process.argv.length > 3) {
        console.log('too many arguments provided');
    } else {
        const baseURL = process.argv[2]; 
        console.log(`staring crawl of: ${baseURL}`);
    }    
};

main();