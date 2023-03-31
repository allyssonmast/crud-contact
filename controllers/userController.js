const asyncHandler = require("express-async-handler");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    res.json({message:"Register the user"});
});


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({message:"Login user"});
});


//@desc Current user
//@route GET /api/users/current
//@access private
const getUser = asyncHandler(async (req,res)=>{
    res.json({message:"Get Current user information"});
});

module.exports ={registerUser,loginUser,getUser}