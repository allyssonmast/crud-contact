const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        require:[true,"Please add the user name"]
    },
    email:{
        type:String,
        require:[true,"Please add the user email adress"],
        unique:[true,"Email adress already taken"]
    },
    password:{
        type:String,
        require:[true,"Please add the user password"],
    },
},
{timestamps:true}
)

module.exports = mongoose.model("User",userSchema);