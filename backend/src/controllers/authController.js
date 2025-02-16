const User = require("../models/User")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        {userID: user._id}, 
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h"}
    )

    res.json(
        { token }
    )
}

module.exports = {loginUser}