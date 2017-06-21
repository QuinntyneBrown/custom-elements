declare var System: any;

const template = document.createElement("template");

const promises = Promise.all([
    System.import("./button.component.html"),
    System.import("./button.component.css")
]);

export class CallToActionSubmitEvent extends CustomEvent {
    constructor() {
        super("[Call To Action] Submit", {
            cancelable: true,
            bubbles: true,
            composed: true
        } as CustomEventInit);
    }
}

export class CallToActionComponent extends HTMLElement {
    constructor() {
        super();
        this.dispatchSubmitEvent = this.dispatchSubmitEvent.bind(this);
    }

    public headline: string;

    public body: string;

    public buttonCaption: string;

    public callToAction: string;

    public finalNote: string;

    public dispatchSubmitEvent() { this.dispatchEvent(new CallToActionSubmitEvent()); }

    public get headlineHTMLElement(): HTMLElement { return this.shadowRoot.querySelector(".headline") as HTMLElement; }

    public get bodyHTMLElement(): HTMLElement { return this.shadowRoot.querySelector(".body") as HTMLElement; }

    public get buttonHTMLElement(): HTMLButtonElement { return this.shadowRoot.querySelector("button") as HTMLButtonElement; }

    public get callToActionHTMLElement(): HTMLElement { return this.shadowRoot.querySelector(".call-to-action") as HTMLElement; }

    public get finalNoteHTMLElement(): HTMLElement { return this.shadowRoot.querySelector(".final-note") as HTMLElement; }

    async connectedCallback() {
        this.attachShadow({ mode: 'open' });
        const assests = await promises;
        template.innerHTML = `<style>${assests[1]}</style>${assests[0]}`;
        this.shadowRoot.appendChild(document.importNode(template.content, true));
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'calltoaction');

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

customElements.define(`ce-call-to-action`, CallToActionComponent);