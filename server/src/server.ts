import express, { Request, Response } from "express";
const app = express()
app.use(express.json())

import cors from "cors";
app.use(cors());

import multer from "multer";
const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, './')
    },
    filename: (req: Request, file, cb) => {
        cb(null, 'image')
    }
})

var upload = multer({
    storage
})

app.get("/communicate", (req: Request, res: Response) => {

    console.log("Hit the endpoint!");
    res.status(200).json({
        received: true,
    });
})

app.post("/uploadFile", upload.single('file'), (req: Request, res: Response) => {

    console.log("Uploading single file...")

    const file = req.file
    console.log(file.filename)
    console.log(file.size)

    res.status(200).json({
        received: true,
        file
    })
})


app.post("/uploadFiles", upload.array('files'), (req: Request, res: Response) => {

    console.log("Uploading multiple files...")

    const files = req.files
    console.log(files)

    res.status(200).json({
        received: true,
        files
    })
})
app.listen(3000, () => {
    console.log('server started at port 3000...')
})
