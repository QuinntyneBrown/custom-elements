declare var System: any;

const template = document.createElement("template");

const promises = Promise.all([
    System.import("./nav-item.component.html"),
    System.import("./nav-item.component.css")
]);

export class NavItemComponent extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return [];
    }

    async connectedCallback() {

        const assests = await promises;

        template.innerHTML = `<style>${assests[1]}</style>${assests[0]}`;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'navitem');

        this._bind();
        this._setEventListeners();
    }

    private async _bind() {

    }

    private _setEventListeners() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            default:
                break;
        }
    }
}

customElements.define(`ce-nav-item`, NavItemComponent);
