import { PATH_TO_UPLOAD, readBuffer } from "./util/file";
// express init and cors

import express, { Request, Response } from "express";
const app = express()
app.use(express.json())

import cors from "cors";
app.use(cors());

// multer init

import multer from "multer";

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, './upload')
    },
    filename: (req: Request, file, cb) => {
        cb(null, 'file-' + file.originalname)
    }
})

var upload = multer({
    storage
})

// routes

app.get("/communicate", (req: Request, res: Response) => {

    console.log("Hit the endpoint!");
    res.status(200).json({
        received: true,
    });
})

// uploading routes

app.post("/uploadFile", upload.single('file'), (req: Request, res: Response) => {

    console.log("Uploading single file...")

    const file = req.file
    console.log("File name: ", file.filename)
    console.log("File size: ", file.size)

    res.status(200).json({
        received: true,
        file
    })

    readBuffer(PATH_TO_UPLOAD + file.originalname)
})

app.post("/uploadFiles", upload.array('files'), (req: Request, res: Response) => {

    console.log("Uploading multiple files...")

    const files = req.files

    for (const [_, file] of Object.entries(files)) {
        console.log("File name: ", file.originalname);
        console.log("File size: ", file.size);

        readBuffer(PATH_TO_UPLOAD + file.originalname)
    }

    res.status(200).json({
        received: true,
        files
    })
})

app.listen(3000, () => {
    console.log('server started at port 3000...')
})
