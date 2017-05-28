const htmlTemplate = require("./header.component.html");
const styles = require("./header.component.scss");

const template = document.createElement("template");
template.innerHTML = `${htmlTemplate}<style>${styles}</style>`;

export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    public headline1: string;

    public headline2: string;

    public get headline1HTMLElement(): HTMLHeadingElement { return this.shadowRoot.querySelector("h2"); }

    public get headline2HTMLElement(): HTMLHeadingElement { return this.shadowRoot.querySelector("h4"); }
    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        this._bind();
    }

    private async _bind() {
        this.headline1HTMLElement.textContent = this.headline1;
        this.headline2HTMLElement.textContent = this.headline2;
    }
    
}

customElements.define(`ce-header`,HeaderComponent);
