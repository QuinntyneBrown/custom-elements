import {Space} from "./space";
import {Rectangle} from "./rectangle";
import {Ruler} from "./ruler";
import {translateXY} from "./translate-xy";

export class Position {
    constructor(
        private _ruler: Ruler,
        private _space: Space,
        private _translateXY: {(element:HTMLElement, x:number, y:number):HTMLElement}
    ) { }

    private static _instance;

    public static get instance() {
        this._instance = this._instance || new Position(Ruler.instance, Space.instance,translateXY);
        return this._instance;
    }

    public somewhere = (a: HTMLElement, b: HTMLElement, space: number, directionPriorityList: Array<string>) => {
        return new Promise(() => {
            throw new Error("");
        });
    }

    public top(a: HTMLElement, b: HTMLElement, space: number): Promise<any> {
        return new Promise(resolve => {
            Promise.all([this._ruler.measure(a), this._ruler.measure(b)])
                .then((resultsArray: Array<Rectangle>) => {
                    var rectangleA = resultsArray[0];
                    var rectangleB = resultsArray[1];
                    this._translateXY(b, rectangleA.centerX - rectangleB.radiusX, rectangleA.bottom + space);
                    resolve();
                });            
        });
    }

    public right(a: HTMLElement, b: HTMLElement, space: number): Promise<any> {
        return new Promise(resolve => {
            Promise.all([this._ruler.measure(a), this._ruler.measure(b)])
                .then((resultsArray: Array<Rectangle>) => {
                    resolve();
                });
        });
    }

    public bottom(a: HTMLElement, b: HTMLElement, space: number): Promise<any> {
        return new Promise(resolve => {
            Promise.all([this._ruler.measure(a), this._ruler.measure(b)])
                .then((resultsArray: Array<Rectangle>) => {
                    resolve();
                });
        });
    }

    public left(a: HTMLElement, b: HTMLElement, space: number): Promise<any> {
        return new Promise(resolve => {
            Promise.all([this._ruler.measure(a), this._ruler.measure(b)])
                .then((resultsArray: Array<Rectangle>) => {
                    resolve();
                });
        });
    }
}