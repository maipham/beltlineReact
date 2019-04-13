
export class TransitHistory {
    constructor(date, route, transport_type, price) {
        this._date = date;
        this._route = route;
        this._transport_type = transport_type;
        this._price = price;
    }

    get route() {
        return this._route;
    }

    get transport_type() {
        return this._transport_type;
    }

    get price() {
        return this._price;
    }
}
