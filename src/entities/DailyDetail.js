
export class DailyDetail {
    constructor(eventname, staffs, visits, revenue) {
        this._eventname = eventname;
        this._staffs = staffs;
        this._totalVisits = visits;
        this._revenue = revenue;
    }

    get eventname() {
        return this._eventname;
    }
    get staffs() {
        return this._staffs;
    }
    get visits() {
        return this._totalVisits;
    }
    get revenue() {
        return this._revenue;
    }
}
