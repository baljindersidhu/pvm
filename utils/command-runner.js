/**
 * The key difference between exec() and spawn() is how they return the data. 
 * As exec() stores all the output in a buffer, it is more memory intensive than spawn(),
 * which streams the output as it comes.
 * 
 * Generally, if you are not expecting large amounts of data to be returned, 
 * you can use exec() for simplicity.
 */

const { exec } = require("child_process");

module.exports = class CommandRunner{

    constructor(){}

    execute = command => {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    reject(error);
                    return;
                }
                // console.log(`stdout: ${stdout}`);
                resolve(stdout);
            });
        })
    }
}