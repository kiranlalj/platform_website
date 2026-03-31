const https = require('https');
https.get('https://plat-form.framer.ai/', res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const vids = [...body.matchAll(/src="([^"]+\.mp4[^"]*)"/g)].map(m => m[1]);
    const imgs = [...body.matchAll(/src="([^"]+\.jpg[^"]*|[^"]+\.png[^"]*|[^"]+\.webp[^"]*)"/g)].map(m => m[1]);
    console.log("Videos:", [...new Set(vids)]);
    console.log("Images:", [...new Set(imgs)].filter(i => i.includes('framerusercontent.com')));
  });
}).on('error', console.error);
