import { textEncrypt, encryptFileToDisk, decryptFileToDisk } from "./util/encryption";

// Init database

import MongoDB from "./db/db";
const database: MongoDB = new MongoDB();

import { deleteFile, PATH_TO_UPLOAD_WITH_NAME, readFileBuffer } from "./util/file";
// express init and cors

import express, { Request, Response } from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());

// multer init

import multer from "multer";

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, './upload')
    },
    filename: (req: Request, file, cb) => {
        cb(null, 'file-' + file.originalname);
    }
});

var upload = multer({
    storage
});

// routes

app.get("/communicate", (req: Request, res: Response) => {

    res.status(200).json({
        received: true,
    });
});

// uploading routes

app.post("/uploadFile", upload.single('file'), async (req: Request, res: Response) => {

    console.log("/uploadFile - Uploading single file...");

    const file = req.file;
    console.log("/uploadFiles - File name: ", file.filename);
    console.log("/uploadFiles - File size: ", file.size);

    const enc = encryptFileToDisk(file.originalname, PATH_TO_UPLOAD_WITH_NAME + file.originalname);

    try {
        decryptFileToDisk(file.originalname, enc.pathToEncryptedFile, enc.iv);

        deleteFile(PATH_TO_UPLOAD_WITH_NAME + file.originalname);

        res.status(200).json({
            received: true,
            encrypted: true,
        });

    } catch (err) {

        console.log(err);

        // teapot ☕

        res.status(418).json({
            received: true,
            encrypted: false,
            err
        });
    }
})

app.post("/uploadFiles", upload.array('files'), (req: Request, res: Response) => {

    console.log("/uploadFiles - Uploading multiple files...");

    const files = req.files

    for (const [_, file] of Object.entries(files)) {
        console.log("/uploadFiles - File name: ", file.originalname);
        console.log("/uploadFiles - File size: ", file.size);

        readFileBuffer(PATH_TO_UPLOAD_WITH_NAME + file.originalname);
    }

    res.status(200).json({
        received: true,
        files
    });
});

app.post("/receiveTextToEncrypt", (req: Request, res: Response) => {

    const textToEncrypt = req.body.text;
    console.log("/receiveTextToEncrypt - Encrypting text... ", textToEncrypt);

    const enc = textEncrypt("aes-192-cbc", textToEncrypt);
    console.log("/receiveTextToEncrypt - Encrypted text: ", enc.encryptedText);

    res.status(200).json({
        received: true,
        encryptedText: enc.encryptedText,
        bytes: enc.iv,
    });
});

app.listen(3000, () => {
    console.log('server started at port 3000...');
});
