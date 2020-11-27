import mongoose from "mongoose";

import dotenv from "dotenv"
import path from "path";
dotenv.config({
    path: path.join(__dirname, '../.env'),
})

export default class MongoDB {

    database: mongoose.Connection;

    useNewUrlParser: boolean = true;
    useUnifiedTopology: boolean = true;
    useCreateIndex: boolean = true;

    private mongoURI: string;

    constructor() {

        this.mongoURI = process.env.URI || '';

        mongoose.connect(this.mongoURI, {
            useNewUrlParser: this.useNewUrlParser,
            useUnifiedTopology: this.useUnifiedTopology,
            useCreateIndex: this.useCreateIndex,
        });

        this.database = mongoose.connection;

        this.database.once("open", (): void => {
            console.log("Connected to MongoDB Atlas database");
        });


    }

}
