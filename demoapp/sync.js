const http = require('http');
const https = require('https');
const User = require('./user.js');

function sync(url) {
    https.get(url, (res) => {
        let body = '';
        if (res.statusCode == 200) {
            res.on('data', (data) => body += data);
            res.on('end', () => {
                try {
                    let data = JSON.parse(body);
                    if (Array.isArray(data.data))
                        data.data.forEach((user) => User.upsert(user));
                    for (let i = 2; i <= data.total_pages && data.page == 1; i++)
                        process.nextTick(() => sync(url + '?page=' + i));
                } catch (ex) {
                    console.error(ex);
                }
            });
        }
    }).on('error', (e) => {
        console.error(e);
    });
}

http.createServer((req, res) => {
    sync('https://reqres.in/api/users');
    res.writeHead(200);
    res.end();
}).listen(81, () => console.log("SYNC Server started.")).on('error', (err) => console.log('HTTP bind error: ' + err));
