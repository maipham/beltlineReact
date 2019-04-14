
export class DailyDetail {
    constructor(event_name, staff_names, visits, revenue) {
        this._ename = event_name;
        this._snames = staff_names;
        this._visits = visits;
        this._revenue = revenue;
    }

    get event_name() {
        return this._ename;
    }
    get staff_name() {
        return this._snames;
    }
    get visits() {
        return this._visits;
    }
    get revenue() {
        return this._revenue;
    }
}
