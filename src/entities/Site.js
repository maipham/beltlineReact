
export class Site {
    constructor(site_name, zipcode, address, manager, open_everyday, event_count, total_visits, my_visits) {
        this._name = site_name;
        this._event = event_count;
        this._visits = total_visits;
        this._my_visits = my_visits;
        this._zipcode = zipcode;
        this._address = address;
        this._manager = manager;
        this._open = open_everyday;
    }

    get site_name() {
        return this._name;
    }
    get event_count() {
        return this._event;
    }
    get visit_count() {
        return this._visits;
    }
    get my_visit() {
        return this._my_visits;
    }
}
