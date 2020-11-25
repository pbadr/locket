import dotenv from "dotenv"
import path from "path";

import fs from "fs";

import { PATH_TO_UPLOAD_WITH_NAME, PATH_TO_UPLOAD, readFileBuffer } from "./file";
import FileType, { FileTypeResult } from 'file-type';

dotenv.config({
    path: path.join(__dirname, '../.env')
})

interface EncryptionObject {
    encryptedText: string,
    iv: Buffer,
}

import crypto from "crypto";

export function textEncrypt(algorithm: string, text: string): EncryptionObject {

    const secret: Buffer = fetchKey(24);
    const iv: Buffer = generateIV(16);
    const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, secret, iv);
    const encryptedText: string = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

    return {
        encryptedText,
        iv,
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
    const cipher = crypto.createCipheriv("aes-256-cbc", secret, iv);

    const PATH_TO_UPLOAD_WITH_NAME_ENCRYPTED = PATH_TO_UPLOAD + 'encrypted/encrypted';
    try {
        const encryptedFile = fs.createWriteStream(PATH_TO_UPLOAD_WITH_NAME_ENCRYPTED + '.enc');

        var data = fs.readFileSync(pathToFile);

        const encrypted = Buffer.concat([
            cipher.update(data),
            cipher.final()
        ])
        encryptedFile.write(encrypted);

    } catch (err) {
        console.log(err);
    }

    return {
        pathToEncryptedFile: PATH_TO_UPLOAD_WITH_NAME_ENCRYPTED + '.enc',
        iv,
    }
}

export function decryptFileToDisk(pathToFile: string, iv: Buffer): void {

    const secret: Buffer = fetchKey(32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", secret, iv);

    fs.readFile(pathToFile, async (err, encryptedDataBuffer) => {
        if (err) {
            console.log("decryptFileToDisk: CANNOT READ FILE:");
            throw err;
        }

        const decryptedFile = Buffer.concat([decipher.update(encryptedDataBuffer), decipher.final()]);

        FileType.fromBuffer(decryptedFile)
            .then(fileObject => {

                var fileType: FileTypeResult | undefined = fileObject
                fs.writeFileSync(PATH_TO_UPLOAD + 'decrypted.' + fileType?.ext, decryptedFile);
                console.log("decryptFileToDisk: Successfully written decrypted file to disk!");
            })
            .catch(err => {
                console.log("decryptFileToDisk: Error getting file type from encrypted file! - ", err);
            });
    })
}

function fetchKey(bytes: number): Buffer {
    return crypto.scryptSync(process.env.SECRET || '', 'salt', bytes);
}

function generateIV(bytes: number): Buffer {
    return crypto.randomBytes(bytes);
}
