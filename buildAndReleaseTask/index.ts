import pipelines = require("azure-pipelines-task-lib");
import pgClient = require("pg");
import fs = require("fs");

function run() {
  try {
    const username: string | undefined = pipelines.getInput("dbUsername", true);
    const password: string | undefined = pipelines.getInput("dbPassword", true);
    const server: string | undefined = pipelines.getInput("dbServer", true);
    const databaseName: string | undefined = pipelines.getInput("dbName", true);

    const scriptPath: string | undefined = pipelines.getInput(
      "scriptPath",
      true
    );

    console.log("Using following parameters:\n");
    console.log(`Database username: ${username}`);
    console.log(`Database server: ${server}`);
    console.log(`Database name: ${databaseName}`);
    console.log(`Script path: ${scriptPath}`);

    let scriptContent = "";
    fs.readFile(scriptPath, "utf8", function(error, contents) {
      if (error) {
        console.log(error);
        pipelines.setResult(pipelines.TaskResult.Failed, error.message);
      }

      console.log("------ contents of script ------\n");
      console.log(contents);
      scriptContent = contents;
    });

    const client = new pgClient.Client({
      user: username,
      host: server,
      password: password,
      database: databaseName
    });

    client.connect().then(res1 => {
      console.log(res1);

      client
        .query(scriptContent)
        .then(res => {
          console.log(res);
          client.end();
          pipelines.setResult(
            pipelines.TaskResult.Succeeded,
            "Script successfully deployed to database."
          );
        })
        .catch(err => {
          console.log(err);
          client.end();
          pipelines.setResult(pipelines.TaskResult.Failed, err.message);
        });
    });
  } catch (err) {
    pipelines.setResult(pipelines.TaskResult.Failed, err.message);
  }
}

run();
