export class VisitHistoryObject {
    constructor(date, event, site, price) {
        this._date = date;
        this._event = event;
        this._site = site;
        this._price = price;
    }

    get event() {
        return this._event;
    }

    get site() {
        return this._site;
    }

    get price() {
        return this._price;
    }

    get date() {
        return this._date;
    }
}
