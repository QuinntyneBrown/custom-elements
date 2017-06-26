import { PopoverService } from "./popover.service";

declare var System: any;

const template = document.createElement("template");

const promises = Promise.all([
    System.import("./popover.component.html"),
    System.import("./popover.component.css")
]);

export class PopoverComponent extends HTMLElement {
    constructor(private _popoverService: PopoverService) {
        super();
        this.open = this.open.bind(this);
    }

    static get observedAttributes () {
        return [
            "host-element-query"
        ];
    }

    async connectedCallback() {

        const assests = await promises;

        template.innerHTML = `<style>${assests[1]}</style>${assests[0]}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));         
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.hostElement = this.parentElement.querySelector(this.hostElementQuery) as HTMLElement;        
    }

    private _setEventListeners() {
        this.hostElement.addEventListener("click", this.open);
    }

    disconnectedCallback() {
        this.hostElement.removeEventListener("click", this.open);
    }

    public open() {
        alert("Open");
    }

    public hostElementId: string;

    public hostElement: HTMLElement;

    public hostElementQuery: string;

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "host-element-query":
                this.hostElementQuery = newValue;
                break;
        }
    }
}

customElements.define(`ce-popover`,PopoverComponent);
