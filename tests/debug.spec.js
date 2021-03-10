import { API, DATA, File, Test } from '../index';

async function main() {
    const response = await API.get(`${DATA.endpoints.meh}${process.env.MEH_AUTH}`);
    console.log(response.data.title);
}

main();