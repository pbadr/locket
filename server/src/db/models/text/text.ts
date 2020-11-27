import { Document } from "mongoose";

export interface Text extends Document {
    textEncryption: string;
    iv: Buffer;
}
