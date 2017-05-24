const htmlTemplate = require("./cta.component.html");
const styles = require("./cta.component.scss");

const template = document.createElement("template");
template.innerHTML = `${htmlTemplate}<style>${styles}</style>`;

export class CtaSubmitEvent extends CustomEvent {
    constructor() {
        super("CTA_SUBMIT_EVENT", {
            cancelable: true,
            bubbles:true
        });
    }
}

export class CtaComponent extends HTMLElement {
    constructor() {
        super();
        this.dispatchSubmitEvent = this.dispatchSubmitEvent.bind(this);
    }

    public headline: string;

    public body: string;
    
    public buttonCaption: string;

    public callToAction: string;

    public finalNote: string;

    public dispatchSubmitEvent() { this.dispatchEvent(new CtaSubmitEvent()); }

    public get headlineHTMLElement(): HTMLElement { return this.shadowRoot.querySelector(".headline") as HTMLElement; }

    public get bodyHTMLElement(): HTMLElement { return this.shadowRoot.querySelector(".body") as HTMLElement; }

    public get buttonHTMLElement(): HTMLButtonElement { return this.shadowRoot.querySelector("button") as HTMLButtonElement; }

    public get callToActionHTMLElement(): HTMLElement { return this.shadowRoot.querySelector(".call-to-action") as HTMLElement; }

    public get finalNoteHTMLElement(): HTMLElement { return this.shadowRoot.querySelector(".final-note") as HTMLElement; }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.headlineHTMLElement.textContent = this.headline;
        this.bodyHTMLElement.innerHTML = this.body;
        this.buttonHTMLElement.textContent = this.buttonCaption;
        this.callToActionHTMLElement.textContent = this.callToAction;
        this.finalNoteHTMLElement.textContent = this.finalNote;
    }

    private _setEventListeners() {
        this.buttonHTMLElement.addEventListener("click", this.dispatchSubmitEvent);
    }

    disconnectedCallback() {
        this.buttonHTMLElement.removeEventListener("click", this.dispatchSubmitEvent);
    }
}

customElements.define(`ce-cta`,CtaComponent);