
export class DailyDetail {
    constructor(eventname, staffs, visits, revenue, date) {
        this._eventname = eventname;
        this._staffs = staffs;
        this._totalVisits = visits;
        this._revenue = revenue;
        this._date = date;
    }

    get date() {
        return this._date;
    }

    set date(d) {
        this._date = d;
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
