import {User} from "./User";
import {user_type} from "./constants";

export class Visitor extends User {
    constructor() {
        super();
    }

    get userType() {
        return user_type.VISITOR;
    }

}