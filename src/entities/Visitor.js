import {User} from "./User";
import {user_type} from "./enums";

export class Visitor extends User {
    constructor() {
        super();
    }

    get userType() {
        return user_type.VISITOR;
    }

}