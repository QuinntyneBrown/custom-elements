const htmlTemplate = require("./button.component.html");
const styles = require("./button.component.scss");

const template = document.createElement("template");
template.innerHTML = `${htmlTemplate}<style>${styles}</style>`;

export class ButtonComponent extends HTMLElement {    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
    }    
}

customElements.define(`ce-button`,ButtonComponent);