import express, { Request, Response } from "express";
const app = express()

import cors from "cors";
app.use(cors());

app.get("/communicate", (req: Request, res: Response) => {
    res.status(200).send("communicated");
})

app.listen(3000, () => {
    console.log('server started at port 3000...')
})
