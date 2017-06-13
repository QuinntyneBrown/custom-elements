const html = require("./paginator.component.html");
const css = require("./paginator.component.scss");

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

declare interface IPagedList<T> {
    data: Array<T>;
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export class PagingConfig {
    constructor(public page: number, public pageSize: number) { }
}

export function validatePagePropertiesAndGetSkipCount(pagingConfig: PagingConfig) {

    if (pagingConfig.page < 1) {
        pagingConfig.page = 1;
    }

    if (pagingConfig.pageSize < 1) {
        pagingConfig.pageSize = 1;
    }

    if (pagingConfig.pageSize > 100) {
        pagingConfig.pageSize = 100;
    }

    return pagingConfig.pageSize * (pagingConfig.page - 1);
}

export class PagedList<T> implements IPagedList<T> {
    constructor(private _data: Array<T>, private _page: number, private _pageSize: number, private _totalCount: number) { }

    get data(): Array<T> { return this._data; }
    get page(): number { return this._page; }
    get pageSize(): number { return this._pageSize; }
    get totalCount(): number { return this._totalCount; }
    get totalPages(): number { return Math.ceil(this._totalCount / this._pageSize); }
}


export class PaginatorComponent<T> extends HTMLElement {
    constructor(public pageSize: number, public pageNumber: number, private _nextCssClass: string, private _previousCssClass: string) {
        super();
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true)); 

        this._nextElement.addEventListener("click", this.onNext);
        this._previousElement.addEventListener("click", this.onPrevious);
        this.setEventListeners();
        this.bind();
    }

    public setEventListeners() {

    }

    public bind() {

    }

    disconnectedCallback() {
        this._nextElement.removeEventListener("click", this.onNext);
        this._previousElement.removeEventListener("click", this.onPrevious);
    }

    public render() {

    }

    public pagedList: IPagedList<T>;
    public entities: Array<T>;

    public onNext(e: Event) {
        e.stopPropagation();

        if (this.pageNumber == this.pagedList.totalPages) {
            this.pageNumber = 1;
        } else {
            this.pageNumber = this.pageNumber + 1;
        }
        this.render();
    }

    public onPrevious(e: Event) {
        e.stopPropagation();

        if (this.pageNumber == 1) {
            this.pageNumber = this.pagedList.totalPages;
        } else {
            this.pageNumber = this.pageNumber - 1;
        }
        this.render();
    }

    private get _nextElement(): HTMLElement { return this.shadowRoot.querySelector(this._nextCssClass) as HTMLElement; }

    private get _previousElement(): HTMLElement { return this.shadowRoot.querySelector(this._previousCssClass) as HTMLElement; }
}

customElements.define(`ce-paginator`,PaginatorComponent);
