import User from "../dao/Mongo/models/User.js";
import {userService} from "../service/index.js";
import CustomError from "../utils/error/customError.js";
import { EErrors } from "../utils/error/enum.js";
import { generateUserErrorsInfo } from "../utils/error/generateInfoUser.js";

class UserController {
    constructor() {
        this.userService = userService;
    }
    getUsers = async(req, res, next) => {
        try {
            const users = await this.userService.getUsers();

            if(users) {
                return res.status(201).json({
                    success: true,
                    message: "User found!",
                    payload: users
                });
            }else{
                return res.status(404).json({
                    success: false,
                    message: `Error products not found`
                })
            }
        } catch (error) {
            next(error);
        }
    }
    getUser = async(req, res, next) => {
        try {
            const {uid} = req.params;
            const user = await this.userService.getUser(uid);

            return res.status(201).json({
                success: true,
                message: "User found!",
                payload: user
            });
        } catch (error) {
            next(error);
        }
    }
    registerUser = async (req, res, next) => {
        try {
            let {name, photo, email, age, rol, password} = req.body;
            console.log(req.body, "req.body");
    
            if(!name || !email || !password) {
                CustomError.createError({
                    name: "User Creation error",
                    cause: generateUserErrorsInfo({name, email, password}),
                    message: "Error trying to create user",
                    code: EErrors.INVALID_TYPE_ERROR
                });
            }
    
            let newUser = {name, photo, email, age, rol, password};
    
            let result = await this.userService.registerUser(newUser);
            console.log(result, "crear user result");
                    
            return res.status(201).json({
                success: true,
                message: "User created!",
                payload: {name, email, age},
                user: result
            });
        } catch (error) {
            next(error);
        }
    }
    updateUser = async (req, res, next) => {
        try {
            const body = req.body;
            const {uid} = req.params;
            const user = await this.userService.updateUser(uid, body);

            if(user) {
                return res.status(201).json({
                    success: true,
                    message: "User updated!",
                    payload: user
                });
            }else{
                return res.status(500).json({
                    success: false,
                    message: `Couldn't update user`
                })
            }

        } catch (error) {
            next(error);
        }
    }
    signIn = async(req, res, next) => {
        try {
            const {email} = req.body;
            req.session.email = email;
            req.session.role = req.user.role;
                return res.status(200).json({
                    success: true,
                    message: `User signed in!`
                })
        } catch (error) {
            next(error);
        }
    };
    signOut = async(req, res, next) => {
        try {
            req.session.destroy();
            return res.status(200).json({
                success: true,
                message: `User signed out!`
            })
        } catch (error) {
            next(error);
        }
    };
    failRegister = (req, res) => res.status(400).json({
        success: false,
        message: `Error auth`
    });
    failRegisterGithub = (req, res) => res.status(403).json({
        success: false,
        message: "bad auth"
    });
    current = async(req, res, next) => {
        try {
            const user = req.user.name;
            const role = req.user.role;
            const token = req.token;
                return res.status(200).cookie('token',req.token,{maxAge:60*60*1000}).json({
                    success: true,
                    message: `Current state: user:${user}, role: ${role} and token: ${token}`
                })
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
