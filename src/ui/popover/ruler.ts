import { Rectangle } from "./rectangle";

export class Ruler implements IRuler {
    constructor(private _document: Document = document) {
        this.measure = this.measure.bind(this);
    }

    private static _instance;

    public static get instance() {
        this._instance = this._instance || new Ruler(document);
        return this._instance;
    }

    public measure(element: HTMLElement): Promise<Rectangle> {
        return new Promise((resolve) => {
            if (this._document.body.contains(element)) {
                const result = Rectangle.fromClientRect(element.getBoundingClientRect());
                resolve(result);
            } else {
                setTimeout(() => {
                    this._document.body.appendChild(element);
                    const clientRect = element.getBoundingClientRect();
                    element.parentNode.removeChild(element);
                    var result = Rectangle.fromClientRect(clientRect);
                    resolve(result);
                }, 0);
            }
        });        
    }
}