import User from "../models/User.js";
import Business from "../models/Business.js";
import jwt from "jsonwebtoken";


const registerBusiness = async (req, res) => {

    const userID = req.user.userID

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

 // Endpoint to get business details for the logged-in user
 const getBusinessDetails = async (req, res) => {
    const userID = req.user.userID;

    try {
        const business = await Business.findOne({ userId: userID });

        if (!business) {
            return res.status(404).json({ message: "Business details not found" });
        }

        return res.status(200).json(business);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};


export { registerBusiness, getBusinessDetails  };