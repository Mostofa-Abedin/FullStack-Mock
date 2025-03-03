import User from "../models/User.js";
import Business from "../models/Business.js";
import jwt from "jsonwebtoken";


const registerBusiness = async (req, res) => {

    // This should probably be a middleware?
    /* const token = req.headers.authorization.substring("Bearer ".length);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
    } catch (error) {
        // Either wrong JWT or not attached, either way needs to login again
        return res
        .status(403)
        .json({
            message: "Not logged in!"
        })
    } 
    // Don't need to attach it to a request unless middleware is used
    req.authUserData = decoded
    */
    const userID = req.user.userID
    /* const user = await User.findOne({_id: userID})
    
    // User not found, must not be logged in
    if (!user) {
        return res
        .status(403)
        .json({
            message: "Not logged in!"
        })
    } */

    const { businessName, industry, website, phone, address } = req.body;

    if (!businessName || !industry || !website || !phone || !address) {
        return res
        .status(401)
        .json({
            message: "Missing required fields"
        })
    }
    try {
        const business = new Business({userId: userID, businessName, industry, website, phone, address})
        await business.save()
        return res.status(201).json({ message: 'Business onboarded successfully', business });
    } catch (err) {
        return res
        .status(400)
        .json({
            message: err.errors
        })
    }
}

export { registerBusiness };
