declare var System: any;

const template = document.createElement("template");

const promises = Promise.all([
    System.import("./card.component.html"),
    System.import("./card.component.css")
]);

export class CardComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes () {
        return [
            "background-color"
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
