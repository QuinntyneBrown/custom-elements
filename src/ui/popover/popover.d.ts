declare interface IPoint {

}

declare interface IRuler {
    measure(element: HTMLElement): Promise<IRectangle>;
}

declare interface IRectangle {

}