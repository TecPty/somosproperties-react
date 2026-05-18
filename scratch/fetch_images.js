const https = require('https');
const http = require('http');

function fetchUrls(url) {
  const lib = url.startsWith('https') ? https : http;
  lib.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const urls = data.match(/https?:\/\/[^\s"'<>\)]+\.(?:jpg|png|webp)/g) || [];
      console.log(Array.from(new Set(urls)).join('\n'));
    });
  }).on('error', (e) => {
    console.error(e);
  });
}

fetchUrls('http://thetowerspanama.com/');
fetchUrls('https://pacificdeveloperspanama.com/portfolio_page/the-towers-business-plaza/');
