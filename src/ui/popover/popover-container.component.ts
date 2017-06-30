import { PopoverService } from "./popover.service";

declare var System: any;

const template = document.createElement("template");

const promises = Promise.all([
    System.import("./popover-container.component.html"),
    System.import("./popover-container.component.css")
]);

export class PopoverContainerComponent extends HTMLElement {
    constructor(private _popoverService: PopoverService = PopoverService.instance) {
        super();

        this.togglePopover = this.togglePopover.bind(this);        
    }

    static get observedAttributes () {
        return [];
    }

    async connectedCallback() {

        const assests = await promises;
        
        template.innerHTML = `<style>${assests[1]}</style>${assests[0]}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'popovercontainer');

        this._bind();
        this._setEventListeners();        
    }

    private get template() { return <HTMLTemplateElement>this.querySelector("[slot=template]"); }

    private async _bind() {

    }

    private _setEventListeners() {
        this.addEventListener("click", this.togglePopover);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.togglePopover);
    }

    public async togglePopover() {


        if (this.isOpen) {

            await this.popoverInstance.hide();
            this.popoverInstance = null;
            this.isOpen = false;

        } else {
            this.isOpen = true;
            this.popoverInstance = await this._popoverService.show({ template: this.template, target: this });
            
        }   

        
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            default:
                break;
        }
    }

    popoverInstance;

    public isOpen: boolean;
}

customElements.define(`ce-popover-container`,PopoverContainerComponent);
