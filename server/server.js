import HTTP from 'http';
import listener from './listener';

function main() {
    const host = 'localhost', port = '4242';
    const server = HTTP.createServer(listener);

    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });

    // TODO: Add close server call in nodemon config end
}

main();
