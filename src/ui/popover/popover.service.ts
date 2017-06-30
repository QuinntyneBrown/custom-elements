import {Position} from "./position";

export class PopoverService {
    constructor() { }

    private static _instance = null;

    public static get instance() {
        this._instance = this._instance || new PopoverService();
        return this._instance;
    }

    public show(options: { template: HTMLTemplateElement, target: HTMLElement }): Promise<{ hide: { (): Promise<any> } }> {
        const documentFragment = options.template.content;
        
        return new Promise((resolve) => {
            resolve(this)
        });
    }

    public hide(): Promise<any> {
        return new Promise((resolve) => {
            resolve();
        });
    }

    private setInitialCss = () => {
        this.nativeElement.setAttribute("style", `-webkit-transition: opacity ${this.transitionDurationInMilliseconds}ms ease-in-out;-o-transition: opacity ${this.transitionDurationInMilliseconds}ms ease-in-out;transition: opacity ${this.transitionDurationInMilliseconds}ms ease-in-out;`);
        this.nativeElement.style.opacity = "0";
        this.nativeElement.style.position = "fixed";
        this.nativeElement.style.top = "0";
        this.nativeElement.style.left = "0";
        this.nativeElement.style.display = "block";
    }

    public transitionDurationInMilliseconds: number;

    public nativeElement: HTMLElement;
    
}