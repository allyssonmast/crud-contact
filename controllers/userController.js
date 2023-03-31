const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {

        res.status(400);
        throw new Error("All fields are mandatory")

    }

    const userAvaliable = await User.findOne({ email })

    if (userAvaliable) {
        res.status(400)
        throw new Error("User alredy registered!");
    }

    //Has password
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        userName, email, password: hashedPassword
    })
    console.log("user created: ", user)

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data us not valid")
    }

    res.json({ message: "Register the user: " });
});


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }

    const user = await User.findOne({ email })

    const checkPass = await bcrypt.compare(password, user.password)

    //compare password
    if (user && checkPass) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id,
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            }
        )
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }

});


//@desc Current user
//@route GET /api/users/current
//@access private
const getUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, getUser }