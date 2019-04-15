
export class Schedule {
    constructor(event_name, site_name, start_date, end_date, staff_count) {
        this._ename = event_name;
        this._sname = site_name;
        this._sDate = start_date;
        this._eDate = end_date;
        this._scount = staff_count;
    }

    get event_name() {
        return this._ename;
    }
    get site_name() {
        return this._sname;
    }
    get start_date() {
        return this._sDate;
    }
    get end_date() {
        return this._eDate;
    }
    get staff_count() {
        return this._scount;
    }
}
