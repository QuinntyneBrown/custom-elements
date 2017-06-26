export class PopoverService {
    constructor() { }

    public show(options: {templateHTML:string}): Promise<any> {
        return new Promise((resolve) => {

        });
    }

    public hide(): Promise<any> {
        return new Promise((resolve) => {

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

    public templateHTML: string;
}