import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

// Create user model
const userModel = mongoose.model('user', userSchema);

export default userModel;


export const validateUserBody = (req, res, next) => {
    const { userName, email, password, profilePic, role} = req.body;
    if (!userName || !email || !password) {
        return res.status(400).send("Missing required fields: userName, email, password, profilePic, or role");
    }
    next();
}