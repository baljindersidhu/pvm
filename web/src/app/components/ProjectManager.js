class ProjectsManager extends HTMLElement {
    _shadowRoot;
    _projectUploaderEl;

    constructor(){
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML = getTemplate();
        
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

    addProject(){
        var projPath = prompt("Please enter your project path:", "");
        if (projPath == null || projPath == "") {
            console.log("User cancelled the prompt.");
        } else {
            console.log("User entered path as: ", projPath);
        }
    }
}

function getTemplate(){
    return `
        <style>
            .ProjectsManager{
                background-color: white;
                width: 25vw;
            }

            .Header{
                text-align: center;
                padding: 2.5vh 0vw;
                border-bottom: 2px solid #f3f3f5;
            }

            .Header button{
                font-family: inherit;
                border: none;
                color: white;
                background-color: #4c84ff;
                cursor: pointer;
                outline: none;
                font-weight: 600;
                font-size: 14px;
                padding: 1vh 4vw 1vh 4vw;
                border-radius: 4px;
                box-shadow: 0px 4px 16px -4px #4c84ff;
            }

            .Header + div.ProjectsList{
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
            <div class="ProjectsList"></div>
        <div>
    `;
}

window.customElements.define("projects-manager", ProjectsManager);