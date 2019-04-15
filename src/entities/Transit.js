export class Transit {
    constructor(route, transport_type, price, connected_sites) {
        this._route = route;
        this._transport_type = transport_type;
        this._price = price;
        this._connected_sites = connected_sites;
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

    get connected_sites() {
        return this._connected_sites;
    }
}
