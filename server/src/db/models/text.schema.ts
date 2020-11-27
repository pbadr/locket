import mongoose, { Schema } from "mongoose";

export default mongoose.model(

    "Text",

    new Schema({
        textEncryption: {
            type: Schema.Types.String,
            required: true,
        },
        textBytes: {
            type: Schema.Types.Buffer,
            required: true,
        },
        summary: {
            type: Schema.Types.String,
        },
        date: {
            type: Schema.Types.Date,
            default: Date.now,
        }
    })

);
