import User from "./models/User.js";
 
class UserDaoMongo {
    constructor() {
        this.userModel = User;
    }

    registerUser = (req, res) => res.status(201).json({
        success: true,
        message: "User created!"
    });
}
