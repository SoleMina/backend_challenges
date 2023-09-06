import User from "./models/User.js";
 
class UserDaoMongo {

    getUsers = async() => {
        return await User.find();
    }

    getUser = async(uid) => {
        return await User.findById(uid);
    }

    registerUser = async(newUser) => {
        return await User.create(newUser);
    }

    updateUser = async(body) => {
        return await User.findByIdAndUpdate(uid, body);
    }
}

export default UserDaoMongo;