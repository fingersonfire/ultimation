import HTTP from 'http';
import Routes from './routes';

const host = 'localhost';
const port = '8080';

const server = HTTP.createServer(Routes);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});