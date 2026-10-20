const https = require('https');

async function searchJobs() {
  return new Promise((resolve, reject) => {
    https.get('https://jobbank.dk/en/api/search/?q=Software+Engineer', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data });
        }
      });
    }).on('error', reject);
  });
}

searchJobs().then(console.log);
