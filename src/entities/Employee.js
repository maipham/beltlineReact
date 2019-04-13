import {status, user_type} from "./enums";
import {User} from "./User";

export class Employee extends User{
    constructor(username, email, password, fname, lname, phone, emp_type, address, is_visitor, site) {
        super(username, email, password, fname, lname);
        this._emp_type = emp_type;
        this._phone = phone;
        this._address = address;
        this._is_visitor = is_visitor;
        this._site = site;
    }
    set site(site) {
        this._site = site;
    }

    set fname(new_fname) {
        this._fname = new_fname;
    }
    set lname(new_lname) {
        this._lname = new_lname;
    }
    set phone(new_phone) {
        this._phone = new_phone;
    }
    set email(new_email) {
        this._email.append(new_email);
    }

    set isVisitor(is_visitor) {
        this._is_visitor = is_visitor;
    }

    get username() {
        return this._username;
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

    get status() {
        return this._status;
    }

    get email() {
        return this._email;
    }

    remove_email(rm_email) {
        for (let i = 0; i < this._email.length; i++) {
            if (this._email[i] === rm_email) {
                this._email.splice(i, 1);
            }
        }
    }

    get userType() {
        return user_type.EMP;
    }

    get phone() {
        return this._phone;
    }

    get is_visitor() {
        return this._is_visitor;
    }

    get emp_type() {
        return this._emp_type;
    }
    get site() {
        return this._site;
    }
}
