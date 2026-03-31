const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
        page.on('requestfailed', request => {
            console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
        });

        await page.goto('http://localhost:8089', { waitUntil: 'load', timeout: 30000 });
        
        // Wait another 2 seconds for any async components to load
        await new Promise(r => setTimeout(r, 2000));
        
        const html = await page.content();
        console.log("HTML length:", html.length);
        
        await browser.close();
    } catch (e) {
        console.error("Script error:", e);
    }
})();
