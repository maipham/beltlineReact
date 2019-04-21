
export class ManageSiteObject {
    constructor(siteName, manager, open) {
        this._siteName = siteName;
        this._manager = manager;
        this._open = open;
    }
    get siteName() {
        return this._siteName;
    }
    get manager() {
        return this._manager;
    }
    get open() {
        return this._open;
    }
}
