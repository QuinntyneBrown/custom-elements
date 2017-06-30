import {Rectangle} from "./rectangle";

export class Space {    
    private static _instance;

    public static get instance() {
        this._instance = this._instance || new Space();
        return this._instance;
    }

    public above(spaceNeed: number, rectangle: Rectangle) {
        return false;
    }

    public below(spaceNeed: number, rectangle: Rectangle) {
        return false;
    }

    public left(spaceNeed: number, rectangle: Rectangle) {
        return false;
    }

    public right(spaceNeed: number, rectangle: Rectangle) {
        return false;
    }
}