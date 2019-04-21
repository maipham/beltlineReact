export class SiteDetailObject {
    constructor(site, openEveryday, address) {
        this._site = site;
        this._openEveryday = openEveryday;
        this._address = address;
    }

    get site() {
        return this._site;
    }

    get openEveryday() {
        return this._openEveryday;
    }

    get address() {
        return this._address;
    }
}