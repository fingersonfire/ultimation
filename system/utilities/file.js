import FS from 'fs';

export default class File {

    /**
     * Creates a file for the given path and file name
     * @param {string} path - Relative path and file name
     */
    static create(path) {
        // TODO: remove the last element in the path and write a blank file
        if(!FS.existsSync(path)) {
            FS.mkdirSync(path, {recursive: true});
        }
    }

    static write(path, data) {
        if(typeof(data) == 'object') {
            data = JSON.stringify(data);
        }

        FS.writeFile(path, data, (err) => {
            if(err) {
                throw new Error(err);
            }
        });
    }

    static read() {
        
    }

}