(() => {

    'use strict';

    const express    = require('express');
    const app        = express();
    const bodyParser = require("body-parser");
    const PORT       = process.env.PORT || 8080;

    const CommandRunnerProvider = require("./utils/command-runner");
    const NPMUtilsProvider      = require("./utils/npm-utils");
    const ProjectPathValidator  = require("./utils/package-json-parser");

    // Static Directory location
    app.use(express.static(__dirname + "/web/src/app"));
    // support parsing of application/json type post data
    app.use(bodyParser.json());
    //support parsing of application/x-www-form-urlencoded post data
    app.use(bodyParser.urlencoded({extended: true}));

    // REST PATHS
    app.get("/", (req,res) => res.sendFile("index.html"));

    app.post("/pvm/addNewProject", async(req, res) => {
        try{
            const projectPath = Buffer.from(req.body.path, 'base64').toString('ascii');

            try{
                const response = await new ProjectPathValidator(projectPath).validateFilePath();
                if(!response.ok){
                    console.log(response);
                    throw new Error();    
                }
            }catch(e){
                res.statusMessage = `Seems like we could not identify path ${projectPath} as a valid NPM project. Please report to devs if this is an issue or consider running npm init`;
                res.sendStatus(500);
                return;
            }

            const npmUtils = new NPMUtilsProvider(new CommandRunnerProvider(), projectPath);
            const projectDetails = await npmUtils.getAllPackagesDetails();
            
            // console.log(projectDetails);
            
            res.statusCode = 200;
            res.json({
                message: "Project uploaded successfully"
            });
        }catch(e){
            console.log(e);
            res.statusMessage = "Oops! Seems like the version you downloaded is not working properly. Please open an issue on our github repository.";
            res.sendStatus(500);
        }
    });

    app.listen(PORT, () => console.log(
        `You can access the console at: http://localhost:${PORT}`
    ));

})();