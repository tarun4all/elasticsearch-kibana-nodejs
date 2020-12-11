require("dotenv").config();

const elasticSearchModule = require("elasticsearch");

//for server host e.g https://username:password@host:port
const elasticClient = new elasticSearchModule.Client({
    host: process.env.ELASTIC_SEARCH_ENDPOINT,
    log: "trace"
});

const pingES = (req, res) => {
    elasticClient.ping({
        requestTimeout: 30000,
    }, function (err) {
        if (err) console.log("Error occures", err);
        else console.log("Cluster is working!");
    });
}

//create index
const createIndex = (req, res, indexName) => {
    elasticClient.indices.create({
        index: indexName
    }).then(function (response) {
        console.log("Index created successfully");
    }, function (err) {
        console.log("Error occures > ", err);
    });
}

//check if index exist
const checkIndex = (req, res, indexName) => {
    elasticClient.indices.checkIndex({
        index: indexName
    }).then(function (response) {
        console.log("Index details >", response);
    }, function (err) {
        console.log("Error occures > ", err);
    })
}

const initMapping = (req, res, indexName, docType, payload) => {
    elasticClient.indices.checkIndex({
        index: indexName,
        type: docType,
        body: payload
    }).then(function (response) {
        console.log("Response >", response);
    }, function (err) {
        console.log("Error occures > ", err);
    });
}

module.exports = {

}