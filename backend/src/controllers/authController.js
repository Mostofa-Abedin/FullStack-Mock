import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const loginUser = async (req, res) => {

    const {email, password} = req.body
    const user = await User.findOne({email})
    
    if (!user) {
        return res
        .status(400)
        .json({
            message: "Invalid Credentials."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res
        .status(400)
        .json({
            message: "Wrong password."
        })
    }


const token = jwt.sign(
    { userID: user._id, role: user.role }, // Included user role in JWT token
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
);

res.json({
    token,
    role: user.role // Sending role to frontend 
});
}

export { loginUser };
