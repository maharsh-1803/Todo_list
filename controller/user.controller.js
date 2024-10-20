const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });


        const result = await newUser.save();
        return res.status(200).json({
            message: "user signUp successfully",
            user: result
        })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "user with this email not exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "invalid credetials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '10d' })

        return res.status(200).json({
            message: "user login successfully",
            user: user,
            token: token
        })

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}


module.exports = {
    signUp,
    logIn
}