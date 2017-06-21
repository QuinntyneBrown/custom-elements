const html = require("./card.component.html");
const css = require("./card.component.scss");

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

export class CardComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [
            "background-color"
        ];
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
            case "background-color":
                this.style.setProperty("--card-background-color", newValue);
                break;
        }
    }
}

customElements.define(`ce-card`,CardComponent);
