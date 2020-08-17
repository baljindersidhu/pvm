/**
 * 
 */
const fs = require("fs");
const path = require("path");
const PACKAGE_FILE_NAME = "package.json";
const FILE_ENCODING = "utf8";

module.exports = class FileReader{
    
    filePath    = "";
    stats       = {};
    valid       = false;
    parsed      = {};

    constructor(filePath){
        this.filePath = filePath;

        // this method checks if user has read/write permission
        // to this File or Directory
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK, err => {
            // console.log(err ? 'no access!' : 'can read/write');
            if(err) throw new Error(err);
        });

        this.evaluateStats();
        this.validateFilePath();
    }

    /**
     * This method validates if given file path points to package json file
     * or the directory. 
     * If it points to package json file then set validate flag as true
     * else check if package.json file exists inside given directory
     * and append it to filePath setting valid as true
     */
    async validateFilePath(){
        if(this.stats.isFile() && this.filePath.endsWith(PACKAGE_FILE_NAME)){
            this.valid = true;
        } else if(this.stats.isDirectory()) {
            let dir;
            try{
                const dir = await fs.promises.opendir(this.filePath);
                let filesList = [];
                for await (let dirent of dir){
                    filesList.push(dirent.name);
                }
                
                if(filesList.includes(PACKAGE_FILE_NAME)){
                    this.valid = true;
                    this.filePath += (path.sep + PACKAGE_FILE_NAME);
                }
            }catch(e){
                console.log("Unexpected error occured while parsing package.json file", e);
            }finally{
                if(dir && dir.close) dir.close();
            }
        }
    }

    /**
     * compute stats: Metadata of Directory/File
     */
    evaluateStats(){
        this.stats = fs.statSync(this.filePath);
    }

    async parsePackageJSON(){
        return new Promise((resolve, reject) => {
            if(this.valid){
                fs.readFile(this.filePath, FILE_ENCODING, (err, data) => {
                    if(err) reject(err);
                    if(data){
                        
                        try{
                            this.parsed = JSON.parse(data);
                        }catch(e){
                            console.log(e);
                            reject(`Illegal Format Exception while reading ${PACKAGE_FILE_NAME} file.`);
                        }

                        resolve(this.parsed);
                    }
                });
            }else{
                reject(`package.json file not found at: ${this.filePath}`);
            }
        })
    }
}