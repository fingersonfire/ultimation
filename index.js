import Environment from 'dotenv';
Environment.config();

export { default as API } from './system/utilities/api';

export { default as DATA } from './data/storage.json'

export { default as File } from './system/utilities/file';

export { default as Test } from './system/automation/test';