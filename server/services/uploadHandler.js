const csv = require("csv-parser");
const fs = require("fs");
const ValidationError = require("../errors/validationError");
const userRepository = require("../repositories/userRepository");

const uploadHandler = {};

uploadHandler.handleUpload = async function (csvFileLocation) {
    const csvRecords = await parseCsv(csvFileLocation);
    const parsedRecords = parseRecords(csvRecords);
    const createdRecords = [];

    if (parsedRecords) {
        for (let index = 0; index < parsedRecords.length; index++) {
            createdRecords.push(await userRepository.createIfNotExists(parsedRecords[index]));
        }
    }

    return createdRecords;
}

function parseCsv(csvFileLocation) {
    const promise = new Promise((resolve, reject) => {
        const parsedRecords = [];
        const stream = fs.createReadStream(csvFileLocation);
        stream
            .pipe(csv())
            .on("data", (data) => parsedRecords.push(data))
            .on("end", () => {
                resolve(parsedRecords);
            })
            .on("error", (error) => {
                reject(error);
            });
    });

    return promise;
}

function parseRecords(csvRecords) {
    const parsedRecords = [];

    for (let index = 0; index < csvRecords.length; index++) {
        const record = csvRecords[index];

        if (!record.Name || !record.Age) {
            var e = new ValidationError("Invalid csv record. Name and Age required");
            throw e;
        }

        if (isNaN(record.Age)) {
            var e = new ValidationError("Age should be number");
            throw e;
        }

        parsedRecords.push({ name: record.Name, age: record.Age });
    }

    return parsedRecords;
}

module.exports = uploadHandler;