
export class ManageUser {
    constructor(emailcount, status, type, username) {
        this._emailcount = emailcount;
        this._status = status;
        this._username = username;
        this._type = type;
    }

    get username() {
        return this._username;
    }

    get emailcount() {
        return this._emailcount;
    }

    get type() {
        return this._type;
    }

    get status() {
        return this._status;
    }
}
