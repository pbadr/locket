import TextModel from "../db/models/text/text.schema";
import { Text } from "../db/models/text/text";

import { Router, Request, Response } from "express";
const router = Router();

import { textEncrypt, textDecrypt } from "../util/encryption";

router.route("/save").post((req: Request, res: Response): void => {
    console.log("/text/save - Saving text...");
    console.log("/text/save - Received text: ", req.body.text);

    const { encryptedText, iv } = textEncrypt("aes-192-cbc", req.body.text)

    new TextModel({
        textEncryption: encryptedText,
        iv
    })
        .save()
        .then(savedText => {

            console.log("/text/save - Successfully saved...");

            res.status(200).json({
                received: true,
                savedText
            });
        });

});

router.route("/get").get((req: Request, res: Response) => {

    TextModel.find({
        _id: req.body.id
    })
        .then(textObject => {

            if (textObject.length == 0) {
                res.status(404).json({
                    message: "Nothing found from query!",
                    found: null,
                    textObject
                })

                return;
            }

            const text: Text = textObject[0];
            const decryptedText = textDecrypt("aes-192-cbc", text.textEncryption, text.iv)

            res.status(200).json({
                decryptedText
            })

        })
        .catch(err => console.log(err))

})

export = router;
