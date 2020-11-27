import mongoose, { Schema } from "mongoose";
import { Text } from "./text";

export default mongoose.model<Text>(

    "text",

    new Schema({
        textEncryption: {
            type: Schema.Types.String,
            required: true,
        },
        iv: {
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
