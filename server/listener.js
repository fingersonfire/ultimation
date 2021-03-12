import qs from 'querystring';

export default function requestListener(req, res) {
    const request = { method: req.method, url: req.url }
    console.log(request.url.split('/').shift());

    if (req.method == 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // Send body data funciton here
            res.end('ok');
        });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(`${JSON.stringify(request)}`);
    }
}