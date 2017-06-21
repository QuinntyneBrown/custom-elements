import "./tag.component";

const html = require("./tag-group.component.html");
const css = require("./tag-group.component.scss");

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

export class TagGroupComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [
            "tags"
        ];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'taggroup');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {

    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    private _tags: Array<string>[];

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "tags":
                this._tags = newValue;
                break;
        }
    }
}

customElements.define(`ce-tag-group`,TagGroupComponent);
