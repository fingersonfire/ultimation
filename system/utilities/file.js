import FS from 'fs';

export default class File {

    /**
     * Creates a file for the given path and file name
     * @param {string} path - Relative path (starts from project root) including the file name
     */
    static create(path) {
        if(!FS.existsSync(path)) {
            // Get the directory path
            dir = path.split('/');
            dir.pop();
            dir = dir.toString().replace(',','/');

            FS.mkdirSync(dir, {recursive: true});
            FS.writeFileSync(path, '', (err) => {
                if(err) {
                    throw new Error(err);
                }
            });
        }
    }

    /**
     * Write data to a JSON file
     * @param {string} path - Relative path (starts from project root) including the file name
     * @param {function} callback - Callback to manipulate data, must return final object
     */
    static write(path, callback) {
        let data = this.read(path);
        const returned = callback(data);

        if(returned === undefined) {
            throw new Error('The File.write funciton callback needs to return data');
        }

        data = JSON.stringify(data);
        FS.writeFile(path, data, (err) => {
            if(err) {
                throw new Error(err);
            }
        });
    }

    /**
     * Read the contents of a JSON file
     * @param {string} path - Relative path (starts from project root) including the file name
     * @returns {object} - JS readable JSON object
     */
    static read(path) {
        return JSON.parse(FS.readFileSync(path));
    }

}