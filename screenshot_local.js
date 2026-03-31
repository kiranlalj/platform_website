const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});
        
        await page.goto('http://localhost:8089', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        
        await page.screenshot({path: 'local.png'});
        await browser.close();
        console.log("Local screenshot captured.");
    } catch (e) {
        console.error(e);
    }
})();
