class ProjectsManager extends HTMLElement {
    _shadowRoot;
    _projectUploaderEl;

    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML = getProjectsManagerTemplate();
        
        // add listener for new project add button click
        this._shadowRoot
            .querySelector(".Header button")
            .addEventListener("click", e => this.addProject(e));

        // bind to file upload
        /*
        this._projectUploaderEl = this._shadowRoot
            .querySelector("input[name='proj-upload']");
        this._projectUploaderEl.addEventListener("change", e => this.processUploadedProject(e));
        */
    }

    /**
     * This method handles click event of adding new project
     * and presents user with a prompt to add new project
     * directory
     */
    addProject(){
        var projPath = prompt("Please enter your project path:", "");
        if (projPath == null || projPath == "") {
            console.log("User cancelled the prompt.");
        } else {
            this.scanProjectAt(projPath);
        }
    }

    /**
     * This method passes the given project directory path to backend
     * where we evaluate if it is a valid NPM package,
     * scans the list of projects and makes an entry in the static file
     * 
     * Receives response from backend which is esentially project details class
     * that we will use to render the list item
     * @param {string} projPath 
     */
    async scanProjectAt(projPath){
        this.toggleInfiniteProgress(true);
        const options = {
            method: "POST",
            body: JSON.stringify({path: btoa(projPath)}),
            headers: {
                'Content-Type': "application/json;charset=UTF-8"
            }
        };

        const response = await fetch("/pvm/addNewProject", options);
        if(response.ok) {
            const newProject = await response.json();
            console.log(newProject);
        }else{
            alert(response.statusText);
            // log this incident where user could not upload project
        }

        this.toggleInfiniteProgress(false), 16000
    }

    /**
     * this method toggles the display of infinite progress
     * showing the loading of project scanning
     * @param {boolean} toggle 
     */
    toggleInfiniteProgress(toggle){
        const _loaderEl = this._shadowRoot.querySelector("infinite-loader");
        _loaderEl.setAttribute("show", toggle);
    }
}

function getProjectsManagerTemplate(){
    return `
        <style>
            .ProjectsManager{
                background-color: white;
                width: 25vw;

                --theme-color: #4c84ff;
            }

            .Header{
                text-align: center;
                padding: 2.5vh 0vw;
            }

            .Header button{
                font-family: inherit;
                border: none;
                color: white;
                background-color: var(--theme-color);
                cursor: pointer;
                outline: none;
                font-weight: 600;
                font-size: 14px;
                padding: 1vh 4vw 1vh 4vw;
                border-radius: 4px;
                box-shadow: 0px 4px 16px -4px var(--theme-color);
                transition: box-shadow 0.25s linear;
            }

            .Header button:hover{
                box-shadow: 0px 8px 32px -10px var(--theme-color); 
            }

            .ProjectsList{
                min-height: 70vh;
            }
        </style>

        <!--<div style="height: 0; opacity: 0;">
            <input type="file" name="proj-upload" 
                webkitdirectory mozdirectory msdirectory 
                odirectory directory
            />
        </div> -->

        <div class="ProjectsManager">
            <div class="Header">
                <button>Add Project</button>
            </div>
            <infinite-loader show="false"></infinite-loader>
            <div class="ProjectsList"></div>
        <div>
    `;
}

window.customElements.define("projects-manager", ProjectsManager);