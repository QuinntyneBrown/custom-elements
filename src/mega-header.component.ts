import { CallToActionComponent } from "./cta.component";
import { HeaderComponent } from "./header.component";

const htmlTemplate = require("./mega-header.component.html");
const styles = require("./mega-header.component.scss");

const template = document.createElement("template");
template.innerHTML = `${htmlTemplate}<style>${styles}</style>`;

export class MegaHeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

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

customElements.define(`ce-mega-header`,MegaHeaderComponent);
