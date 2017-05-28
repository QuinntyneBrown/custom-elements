const htmlTemplate = require("./content-block.component.html");
const styles = require("./content-block.component.scss");

const template = document.createElement("template");
template.innerHTML = `${htmlTemplate}<style>${styles}</style>`;

export class ContentBlockComponent extends HTMLElement {
    constructor() {
        super();
    }

    public imageUrl: string;

    public headline1: string;

    public body: string;

    public get headlineHTMLElement(): HTMLHeadingElement { return this.shadowRoot.querySelector("h2"); }

    public get bodyHTMLElement(): HTMLParagraphElement { return this.shadowRoot.querySelector("p"); }

    public get imgHTMLElement(): HTMLImageElement { return this.shadowRoot.querySelector("img"); }
    
    static get observedAttributes () {
        return [];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        this._bind();
    }

    private async _bind() {
        this.headlineHTMLElement.textContent = this.headline1;
        this.bodyHTMLElement.textContent = this.body;
        this.imgHTMLElement.src = this.imageUrl;
    }
}

customElements.define(`ce-content-block`,ContentBlockComponent);
