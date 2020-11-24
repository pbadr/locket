import dotenv from "dotenv"
import path from "path";

import fs from "fs";

import { PATH_TO_UPLOAD_WITH_NAME, PATH_TO_UPLOAD, readBuffer, deleteFile } from "./file";
import FileType, { FileTypeResult } from 'file-type';

dotenv.config({
    path: path.join(__dirname, '../.env')
})

interface EncryptionObject {
    encryptedText: string,
    iv: Buffer,
}

import crypto from "crypto";

export function textEncryption(algorithm: string, text: string): EncryptionObject {

    const secret: Buffer = fetchKey(24);
    const iv: Buffer = generateIV(16);
    const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, secret, iv);
    const encryptedText: string = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

    return {
        encryptedText,
        iv
    }
}

export function textDecrypt(algorithm: string, encryption: string, iv: Buffer): string {
    const secret: Buffer = fetchKey(24);
    const decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, secret, iv);
    const decryptedText: string = decipher.update(encryption, 'hex', 'utf8') + decipher.final('utf8');

    return decryptedText
}

export function encryptFileToDisk(pathToFile: string): any {
    const secret: Buffer = fetchKey(32);
    const iv: Buffer = generateIV(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv)

    const PATH_TO_UPLOAD_WITH_NAME_ENCRYPTED = '' + PATH_TO_UPLOAD + 'encrypted/encrypted'

    const input = fs.createReadStream(pathToFile);
    console.log("READING FILE BYTES BEFORE ENCRYPTION:");
    readBuffer(pathToFile);

    try {
        const output = fs.createWriteStream(PATH_TO_UPLOAD_WITH_NAME_ENCRYPTED + '.enc')

        input.pipe(cipher)
            .pipe(output);

        output.on('finish', () => {
            console.log('File encrypted successfully...');
            readBuffer(PATH_TO_UPLOAD_WITH_NAME_ENCRYPTED + '.enc');
        });
    } catch (err) {
        console.log(err);
    }

    return {
        pathToEncryptedFile: PATH_TO_UPLOAD_WITH_NAME_ENCRYPTED + '.enc',
        iv
    }
}

export function decryptFileToDisk(pathToFile: string, iv: Buffer): void {

    let dataEncryptionBuffer: Buffer;

    const secret: Buffer = fetchKey(32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", secret, iv);

    fs.readFile(pathToFile, async (err, data) => {
        if (err) throw err

        dataEncryptionBuffer = data;

        const output = Buffer.concat([decipher.update(dataEncryptionBuffer), decipher.final()]);

        FileType.fromBuffer(output)
            .then(fileObject => {
                var fileType: FileTypeResult | undefined = fileObject
                fs.writeFileSync(PATH_TO_UPLOAD + 'decrypted.' + fileType?.ext, output);
                console.log("Successfully written decrypted file to disk!");
            })
            .catch(err => {
                console.log("Error getting file type from encrypted file! - ", err);
            });


    })

}

function fetchKey(bytes: number): Buffer {
    return crypto.scryptSync(process.env.SECRET || '', 'salt', bytes);
}

function generateIV(bytes: number): Buffer {
    return crypto.randomBytes(bytes);
}
