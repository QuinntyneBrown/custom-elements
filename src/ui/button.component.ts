const html = require("./button.component.html");
const css = require("./button.component.scss");

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

export class ButtonComponent extends HTMLElement {    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
    }    
}

customElements.define(`ce-button`,ButtonComponent);