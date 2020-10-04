import { File, Test } from '../index';

const file = './reports/data.json';
const json = { name: 'First Last', age: '32' }

Test.Suite('Suite', () => {

    Test.Case('Test Case', () => {
        // File.create(file);
        const isObject = (typeof(json) == "object");
        console.log(isObject);
        // File.write(file, JSON.stringify(json));
    });

});
