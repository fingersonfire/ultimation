import { Routes, Query, URL } from './index';

export default function requestListener(req, res) {
    switch (URL.parse(req.URL)) {
        case '/tasks':
            
            break;
        default:
            res.writeHead(404);
            res.end('error: "Resource not found"');
            break;
    }
}