declare var System: any;

const template = document.createElement("template");

const promises = Promise.all([
    System.import("./content-block.component.html"),
    System.import("./content-block.component.css")
]);

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
        return [
            "content-block"
        ];
    }

    async connectedCallback() {
        const assests = await promises;

        template.innerHTML = `<style>${assests[1]}</style>${assests[0]}`; 
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        this._bind();
    }

    private async _bind() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "content-block":
                this.contentBlock = JSON.parse(newValue);
                this.style.backgroundImage = `url("${this.contentBlock.imageUrl}")`;
                this.heading1Element.innerHTML = this.contentBlock.heading1;
                this.heading2Element.innerHTML = this.contentBlock.heading2;
                break;
        }
    }

    public contentBlock: any;
    public get heading1Element(): HTMLElement { return this.shadowRoot.querySelector("h2") as HTMLElement; }
    public get heading2Element(): HTMLElement { return this.shadowRoot.querySelector("h3") as HTMLElement; }
}

customElements.define(`ce-content-block`,ContentBlockComponent);
