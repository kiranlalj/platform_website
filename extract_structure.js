const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://plat-form.framer.ai/', { waitUntil: 'domcontentloaded' });
        
        // Wait for dynamic elements to render
        await new Promise(r => setTimeout(r, 5000));
        
        const content = await page.evaluate(() => {
            // Function to extract text and basic structure
            const getStructure = (node, depth = 0) => {
                if (node.nodeType === 3) {
                    const text = node.textContent.trim();
                    return text ? '  '.repeat(depth) + text + '\n' : '';
                }
                
                let out = '';
                if (node.nodeType === 1) {
                    // Skip scripts, styles
                    if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'SVG'].includes(node.tagName)) return '';
                    
                    let tagInfo = node.tagName.toLowerCase();
                    if (node.id) tagInfo += '#' + node.id;
                    if (node.className && typeof node.className === 'string') {
                        tagInfo += '.' + node.className.split(' ').join('.');
                    }
                    
                    // Don't clog with framer internal classes
                    tagInfo = tagInfo.substring(0, 100);
                    // out += '  '.repeat(depth) + '<' + tagInfo + '>\n';
                }
                
                for (const child of node.childNodes) {
                    out += getStructure(child, depth + 1);
                }
                return out;
            };
            return getStructure(document.body);
        });
        
        fs.writeFileSync('framer_structure.txt', content);
        await browser.close();
        console.log("Done extracting");
    } catch (e) {
        console.error(e);
    }
})();
