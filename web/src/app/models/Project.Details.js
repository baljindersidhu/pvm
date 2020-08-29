class ProjectDetails{

    _name;
    _description;
    _version;
    _tags = [];
    _scripts = [];
    git;
    author={};


    constructor(){}

    get name(){return this._name}
    set name(name){this._name = name}

    get description(){return this._description};
    set description(description){this._description = description}

    get version(){return this._version}
    set version(){return this._version = version}

    get tags(){return this._tags}
    set tags(tags){if(Array.isArray(tags)){this._tags = tags}}
    addTag(tag){if(tag.toString() === tag){this._tags.push(tag)}}

    get scripts(){return this._scripts}
    set scripts(scripts){if(Array.isArray(scripts)){this._scripts = scripts}}
    addScript(scriptName, scriptCommand){this._scripts.push(new NPMScriptActions(scriptName, scriptCommand))}

    updateAuthor(name, gitUrl, email){
        this.author = new NPMAuthor(name, gitUrl, email);
    }
}

class NPMScriptActions{
    _actionName;
    _command;

    constructor(name, command){
        this._actionName = name;
        this._command = command;
    }
}

class NPMAuthor{
    _name;
    _gitUrl;
    _email;

    constructor(name, git, email){
        this._name = name;
        this._gitUrl = git;
        this._email = email;
    }

    getInitials(){
        let initials = this._name.split(" ");
        return initials.slice(0, 2).map(word => word.charAt(0)).join("");
    }

}