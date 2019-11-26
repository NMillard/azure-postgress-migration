"use strict";
exports.__esModule = true;
var pipelines = require("azure-pipelines-task-lib");
var pgClient = require("pg");
var fs = require("fs");
function run() {
    try {
        var username = pipelines.getInput("dbUsername", true);
        var password = pipelines.getInput("dbPassword", true);
        var server = pipelines.getInput("dbServer", true);
        var databaseName = pipelines.getInput("dbName", true);
        var scriptPath = pipelines.getInput("scriptPath", true);
        console.log("Using following parameters:\n");
        console.log("Database username: " + username);
        console.log("Database server: " + server);
        console.log("Database name: " + databaseName);
        console.log("Script path: " + scriptPath);
        var scriptContent_1 = "";
        fs.readFile(scriptPath, "utf8", function (error, contents) {
            if (error)
                console.log(error);
            console.log("------ contents of script ------\n");
            console.log(contents);
            scriptContent_1 = contents;
        });
        var client_1 = new pgClient.Client({
            user: username,
            host: server,
            password: password,
            database: databaseName
        });
        client_1.connect().then(function (res1) {
            console.log(res1);
            client_1
                .query(scriptContent_1)
                .then(function (res) {
                console.log(res);
                client_1.end();
            })["catch"](function (err) {
                console.log(err);
                client_1.end();
            });
        });
    }
    catch (err) {
        pipelines.setResult(pipelines.TaskResult.Failed, err.message);
    }
}
run();
