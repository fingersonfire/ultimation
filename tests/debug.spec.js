import { API, File, Test } from '../index';

const file = './reports/data.json';
const json = { name: 'First Last', age: '32' }

Test.Suite('Suite', () => {

    Test.Case('Test Case', () => {
        const res = API.get('https://ifconfig.me');
        console.log(res);
    });

});
