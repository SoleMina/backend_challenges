import User from "./models/User.js";
 
class UserDaoMongo {
    constructor() {
        this.userModel = User;
    }
}

export default UserDaoMongo;