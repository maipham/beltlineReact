
export class DailyDetail {
    constructor(date, events, staffs, totalVisits,revenue) {
        this._date = date;
        this._events = events;
        this._staffs = staffs;
        this._totalVisits = totalVisits;
        this._revenue = revenue;
    }

    get date() {
        return this._date;
    }
    get events() {
        return this._events;
    }
    get stafs() {
        return this._staffs;
    }
    get totalVisits() {
        return this._totalVisits;
    }
    get revenue() {
        return this._revenue;
    }
}
