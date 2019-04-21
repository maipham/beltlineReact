
export class ManageUser {
    constructor(username, emailcount, type, status) {
        this._username = username;
        this._emailcount = emailcount;
        this._type = type;
        this._status = status;
    }

    get username() {
        return this._username;
    }

    get emailcounter() {
        return this._emailcount;
    }

    get type() {
        return this._type;
    }

    get status() {
        return this._status;
    }
}
