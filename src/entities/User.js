import {status, user_type} from "./enums";

export class User {
    constructor(username, email, password, fname, lname) {
        this._username = username;
        this._email= email;
        this._password = password;
        this._fname = fname;
        this._lname = lname;
        this._status = status.PENDING;
    }

    set status(status) {
        this._status = status;
    }

    get username() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get fname() {
        return this._fname;
    }
    get lname() {
        return this._lname;
    }

    get userType() {
        return user_type.USER;
    }

    get status() {
        return this._status;
    }
}