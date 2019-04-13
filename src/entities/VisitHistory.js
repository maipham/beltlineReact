
export class VisitHistory {
    constructor(v_date, event, site, price, start_date, end_date) {
        this._vDate = v_date;
        this._event = event;
        this._site = site;
        this._price = price;
        this._sDate = start_date;
        this._eDate = end_date;
    }
    get visit_date() {
        return this._vDate;
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
    get start_date() {
        return this._sDate;
    }
    get end_date() {
        return this._eDate;
    }
}
