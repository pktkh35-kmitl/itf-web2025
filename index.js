const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use("/lab14", express.static(path.join(__dirname, "LAB14")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/ping", (req, res) => {
    res.json({
        text: "Hello it68070087"
    })
});

app.post("/convert", (req, res) => {
    try {
        const { input, type } = req.body;

        if (type === "USD") {
            return res.json({
                amount: Number(input * 32.07).toFixed(2)
            });
        } else if (type === "THB") {
            return res.json({
                amount: Number(input / 32.07).toFixed(2)
            });
        }

        res.json({
            amount: 0
        });
    } catch (error) {
        throw Error("Invalid Body");
    }
});

let MOCK_DATA = [];

app.post("/form", (req, res) => {
    try {
        const { owner, color, type, wheel, weight } = req.body;

        MOCK_DATA.push({
            owner,
            color,
            type,
            wheel,
            weight,
            id: MOCK_DATA.length
        });

        console.log(MOCK_DATA);

        res.json(MOCK_DATA[MOCK_DATA.length - 1]);
    } catch (error) {
        throw new Error("Invalid body");
    }
})

app.listen(3000, () => console.log("Server is listening on http://localhost:3000"));