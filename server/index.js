const express = require("express");
const cors = require("cors");
const fs = require('fs');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const uploadHandler = require("./services/uploadHandler");
const { default: ValidationError } = require("./errors/validationError");
const getDataHandler = require("./services/getDataHandler");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true
}));

const port = 3001;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/all", async (req, res) => {
    try {
        const records = await getDataHandler.getData();
        res
        .status(200)
        .send({
            records
        });
    } catch (error) {
        console.error(error);

        if (error.name === "ValidationError")
            res
                .status(400)
                .send({
                    error: error.message
                });
        else
            res
                .status(500)
                .send({
                    error: "Unhandled error occurred"
                });
    }
});

app.post("/upload", async (req, res) => {

    try {
        res.set("Content-Type", "application/json");

        if (!req.files || !req.files.file) {
            res
                .set("Content-Type", "application/json")
                .status(400)
                .send(
                    {
                        error: "File is missing in the request"
                    });
            return;
        }

        const fileLocation = await saveFileInTempLocation(req.files.file);
        const createdRecords = await uploadHandler.handleUpload(fileLocation);
        
        // delete the file.
        try {
            console.log(fileLocation);
            fs.unlinkSync(fileLocation)
        } catch (err) {
            console.error(err)
        }

        res
            .status(200)
            .send({
                data: createdRecords
            });
    }
    catch (error) {
        console.error(error);

        if (error.name === "ValidationError")
            res
                .status(400)
                .send({
                    error: error.message
                });
        else
            res
                .status(500)
                .send({
                    error: "Unhandled error occurred"
                });

    }
});


app.listen(port, () => {
    console.log(`Backend listening to port ${port}`);
});

async function saveFileInTempLocation(uploadedFile) {
    const fileExtension = getFileExtension(uploadedFile.name);
    const updateFileName = `${uuidv4()}.${fileExtension}`;
    const fileLocation = `./files/${updateFileName}`;
    await uploadedFile.mv(fileLocation);
    return fileLocation;
}

function getFileExtension(fileName) {
    var fileNameParts = path.extname(fileName).split(".");
    return fileNameParts[1];
}