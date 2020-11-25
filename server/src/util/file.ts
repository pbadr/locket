import fs from "fs";

export const PATH_TO_UPLOAD = './upload/';
export const PATH_TO_UPLOAD_WITH_NAME = './upload/file-';

export function readFileBuffer(path: string): void {

    fs.open(path, 'r', (status, fd) => {

        if (status) {
            console.log('Error: ', status.message);
            return;
        }

        var buffer: Buffer = Buffer.alloc(100);

        fs.read(fd, buffer, 0, 100, 0, (err, num) => {
            console.log("Reading buffer of " + path + "....\n\n");
            console.log(buffer.toString('utf-8', 0, num));

        });

    });
}

export function deleteFile(path: string) {
    try {
        fs.unlinkSync(path);
        console.log("Deleted file: ", path);
    } catch (err) {
        console.log("Error deleting file -- ", err);
        throw err;
    }
}
