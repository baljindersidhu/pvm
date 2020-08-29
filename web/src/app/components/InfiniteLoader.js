class InfiniteLoader extends HTMLElement {

    _progressEl;
    _shadowRoot;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML = getInfiniteLoaderTemplate();
        this._progressEl = this._shadowRoot.querySelector(".Progress");
    }

    static get observedAttributes() { return ["show"]; }

    attributeChangedCallback(attrName, attrOldVal, attrNewVal){
        if(attrName === "show"){
            this._progressEl.setAttribute("data-show", attrNewVal);
        }
    }



}

function getInfiniteLoaderTemplate(){
    return `
        <style>
            div.Separator,
            div.Progress{
                height: 2px;
                background-color: #f3f3f5;
                overflow: hidden;
            }

            div.Progress{
                background-color: var(--theme-color);
                animation: indeterminite-progress 4s infinite linear;
                display: none;
            }

            div.Progress[data-show='true']{
                display: block;
            }

            @keyframes indeterminite-progress {
                0% {
                    transform: scaleX(1) translateX(-50vw);
                }

                50% {
                    transform: scaleX(0) translateX(100vw);
                }

                100% {
                    transform: scaleX(1) translateX(-50vw);
                }
            }

        </style>

        <div class="Separator"><div class="Progress" data-show="false"></div></div>
    `;
}

window.customElements.define('infinite-loader', InfiniteLoader);