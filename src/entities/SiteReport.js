
export class SiteReport {
    constructor(date, event_count, staff_count, visits, revenue) {
        this._date = date;
        this._ecount = event_count;
        this._scount = staff_count;
        this._visits = visits;
        this._revenue = revenue;
    }

    get date() {
        return this._date;
    }

    get event_count() {
        return this._ecount;
    }

    get staff_count() {
        return this._scount;
    }

    get visits() {
        return this._visits;
    }
    get revenue() {
        return this._revenue;
    }
}
