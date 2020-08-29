const LIST_ALL_PACKAGES             = "npm ls --json";
const LIST_ALL_PACKAGES_IN_DETAIL   = "npm ls -l --json";
const AUDIT_PACKAGES                = "npm audit --json";
const FIX_AUDIT                     = "npm audit fix --json";
const SIMUALTE_AUDIT_FIX            = "npm audit --dry-run --json";

/**
 * This module is used to run NPM Utility commands
 * using the given CommandRunner instance at given
 * target directory
 */
module.exports = class NPMUtils{
    commandRunner;
    targetDir;

    constructor(commandRunner, dirPath){
        this.commandRunner = commandRunner;
        this.dirPath = dirPath;
    }

    getAllPackages(){
        return executeCommand.call(this, LIST_ALL_PACKAGES);
    }

    getAllPackagesDetails(){
        return executeCommand.call(this, LIST_ALL_PACKAGES_IN_DETAIL);
    }

    runAuditOfPackages(){
        return executeCommand.call(this, AUDIT_PACKAGES);
    }

    runAuditFixSimulation(){
        return executeCommand.call(this, SIMUALTE_AUDIT_FIX);
    }

    runAuditFix(){
        return executeCommand.call(this, FIX_AUDIT);
    }

    

    appendDirectoryPathPrefix(command){
        return `${command} --prefix ${this.dirPath}`;
    }
}

function executeCommand(command){
    command = this.appendDirectoryPathPrefix(command);
    return new Promise(async (resolve, reject) => {
        try{
            let output = await this.commandRunner.execute(command);
            resolve(JSON.parse(output));
        }catch(error){
            reject(error);
        }
    });
}