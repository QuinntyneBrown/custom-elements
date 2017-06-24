declare var System: any;

const template = document.createElement("template");

const promises = Promise.all([
    System.import("./dots-button.component.html"),
    System.import("./dots-button.component.css")
]);

export class DotsButtonComponent extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {

        const assests = await promises;
        
        template.innerHTML = `<style>${assests[1]}</style>${assests[0]}`; 

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        
        this.style.height = `${0.6875 * Number(this.offsetWidth)}px`;
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'dotsbutton');
    }

}

customElements.define(`ce-dots-button`,DotsButtonComponent);
