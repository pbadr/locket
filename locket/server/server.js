const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.get("/communicate", (req, res) => {
    console.log("Hit the endpoint");
    res.json("Communicating");
});

app.listen("3000", () => {
    console.log("Listening to port 3000..")
})
