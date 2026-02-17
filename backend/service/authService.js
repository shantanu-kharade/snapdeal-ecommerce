import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const loginService = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).send({ message: "Email not found" })
        }

        const verify = await bcrypt.compare(password, user.password)
        if (!verify) {
            return res.status(400).send({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' })

        res.status(200).send({ token })
    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ message: "Internal Server Error" })
    }
}

const registerService = async (req, res) => {
    try {
        const { userName, email, password, profilePic, role} = req.body;

        let user = await userModel.findOne({email : email});
        if(user){
            return res.send("email id already registered!")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new userModel({
            userName: userName,
            email: email,
            password: hashedPassword,
            profilePic: profilePic || 'Defalut_PIC_url',
            role : role || 'customer'
        })

        user = await user.save();

        if (!user) {
            return res.status(400).send("User Cannot created");
        }

        res.status(201).json({message : "User Created Successfully", user});
    }
    catch (error) {
        res.send(error.message);
    }
}
const logoutService = async (req,res) => {
    try {
        // Invalidate the token on client side by removing it
        res.json({ message: "User logged out successfully" });
    }
    catch (error) {
        res.send(error.message);
    }
}
export {
    loginService,
    registerService,
    logoutService
}
