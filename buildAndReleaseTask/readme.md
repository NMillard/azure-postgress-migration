# Local development

The extension is written in TypeScript.
You'll need to install some packages before local development is possible.
Run the npm script below
`npm i -g typescript tfx-cli` this installs the azure extensions CLI  
`npm i --save azure-pipelines-task-lib pg` installs the Azure pipelines and Postgres SDK  
`npm i --save-dev @types/node @types/q @types/pg` installs the TypeScript types

# Build the extension

Build the extension by running `tsc ./index.ts` - you'll need to `cd` to the buildAndReleaseTask folder.

# Running the extensions on local machine

Cd to buildAndReleaseTask and run `node ./index.js`.  
This is same Azure DevOps Pipelines will do.

# Compile new version of the extension

Build new version of the Azure Task by running the command below.  
`tfx extension create --manifest-globs vss-extension.json` from the root folder.

This creates a new build of the extension that can be published at the Visual Studio Extension Marketplace platform  
https://marketplace.visualstudio.com/ / https://marketplace.visualstudio.com/manage/

It requires you've set up a publisher profiler. Follow this link: https://marketplace.visualstudio.com/manage/createpublisher

# Resources

task.json scheme: https://github.com/Microsoft/azure-pipelines-task-lib/blob/master/tasks.schema.json
Custom Azure Pipeline extension development docs: https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops
