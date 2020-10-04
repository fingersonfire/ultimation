import FS from 'fs';

export default class File {

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

    static read(path) {
        const data = FS.readFile(path, (err) => {
           if(err) {
               throw new Error(err);
           }
           console.log();
        });
    }

}