import express, { Request, Response } from "express";
const app = express()
app.use(express.json())

import cors from "cors";
app.use(cors());

const PATH = './';
import fileUpload from "express-fileupload";
app.use(fileUpload())

app.get("/communicate", (req: Request, res: Response) => {
    console.log("Hit the endpoint!");
    res.status(200).json({
        received: true,
    });
})

app.post("/upload", (req: Request, res: Response) => {
    console.log(req.files)
    res.status(200).json({
        received: true,
    })
})

app.listen(3000, () => {
    console.log('server started at port 3000...')
})
