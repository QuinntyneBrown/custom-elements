export function translateXY (element: HTMLElement, x: number, y: number) {
    element.style["-moz-transform"] = `translate(${x}px, ${y}px)"`;
    element.style["-webkit-transform"] = `translate(${x}px, ${y}px)"`;
    element.style["-ms-transform"] = `translate(${x}px, ${y}px)"`;
    element.style["-transform"] = `translate(${x}px, ${y}px)"`;
    return element;
}