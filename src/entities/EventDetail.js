export default class EventDetail {
    set name(value) {
        this._name = value;
    }

    set site(value) {
        this._site = value;
    }

    set startDate(value) {
        this._startDate = value;
    }

    set endDate(value) {
        this._endDate = value;
    }

    set duration(value) {
        this._duration = value;
    }

    set staffs(value) {
        this._staffs = value;
    }

    set capacity(value) {
        this._capacity = value;
    }

    set price(value) {
        this._price = value;
    }

    set description(value) {
        this._description = value;
    }

    set ticketPrice(value) {
        this._ticketPrice = value;
    }

    set ticketsRemain(value) {
        this._ticketsRemain = value;
    }

    set visitDate(value) {
        this._visitDate = value;
    }
    get name() {
        return this._name;
    }

    get site() {
        return this._site;
    }

    get startDate() {
        return this._startDate;
    }

    get endDate() {
        return this._endDate;
    }

    get duration() {
        return this._duration;
    }

    get staffs() {
        return this._staffs;
    }

    get capacity() {
        return this._capacity;
    }

    get price() {
        return this._price;
    }

    get description() {
        return this._description;
    }

    get ticketPrice() {
        return this._ticketPrice;
    }

    get ticketsRemain() {
        return this._ticketsRemain;
    }

    get visitDate() {
        return this._visitDate;
    }
    _name;
    _site;
    _startDate;
    _endDate;
    _duration;
    _staffs;
    _capacity;
    _price;
    _description;
    _ticketPrice;
    _ticketsRemain;
    _visitDate;
    constructor(name, site, startDate, endDate, duration, staffs,
                capacity, price, description, ticketPrice,
                ticketsRemain, visitDate) {
        this._name = name;
        this._site = site;
        this._startDate = startDate;
        this._endDate = endDate;
        this._duration = duration;
        this._staffs = staffs;
        this._capacity = capacity;
        this._price = price;
        this._description = description;
        this._ticketPrice = ticketPrice;
        this._ticketsRemain = ticketsRemain;
        this._visitDate = visitDate;
    }
}
