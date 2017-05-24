const htmlTemplate = require("./header.component.html");
const styles = require("./header.component.scss");

const template = document.createElement("template");
template.innerHTML = `${htmlTemplate}<style>${styles}</style>`;

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    public backgroundImageUrl: string;

    static get observedAttributes () {
        return [];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {

    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            default:
                break;
        }
    }
}

customElements.define(`ce-header`,HeaderComponent);
