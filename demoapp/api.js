const http = require('http');
const zlib = require('zlib');
const stream = require('stream');
const User = require('./user.js');

class StringStream extends stream.Readable {
    constructor(str) {
        super()
        this._str = str
    }

    _read() {
        if (!this.ended) {
            process.nextTick(() => {
                this.push(Buffer.from(this._str, 'utf8'))
                this.push(null)
            })
            this.ended = true
        }
    }
}

http.createServer((req, res) => {
    res.writeHead(200, {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'content-encoding': 'gzip',
    });
    User.findAll().then(users => {
        (new StringStream(JSON.stringify(users))).pipe(zlib.createGzip()).pipe(res);
    });
}).listen(82, () => console.log("API Server started.")).on('error', (err) => console.log('HTTP bind error: ' + err));
