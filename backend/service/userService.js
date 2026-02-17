import User from '../model/userModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUserIdFromRequest } from '../helper/helper.js';
import 'dotenv/config'




const getUserProfileService = async (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).send("User not found");
        }
        return user;
    }
    catch (error) {
        res.send(error.message);
    }

}

const updateUserService = async (req, res) => {
    try {
        const userId = getUserIdFromRequest(req);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (req.body.pass) {
            req.body.pass = await bcrypt.hash(req.body.pass, 10);
        }

        const updatedata = {
            userName: req.body.userName || user.userName,
            email: req.body.email || user.email,
            profilePic: req.body.profilePic || user.profilePic,
            password: req.body.pass || user.password
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedata, { new: true }).select('-password');
        return updatedUser;
    }
    catch (error) {
        res.send(error.message);
    }
}

const getAllUsersService = async (req, res) => {
    try {
        // const userId = getUserIdFromRequest(req);
        const user = await User.find();
        if (!user) {
            return res.status(404).send("User not found");
        }
        return user;
    }
    catch (error) {
        res.send(error.message);
    }
}


export {
    getUserProfileService,
    updateUserService,
    getAllUsersService
}